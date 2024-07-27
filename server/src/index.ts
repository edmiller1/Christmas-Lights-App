require("dotenv").config();

import { resolvers, typeDefs } from "./graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const port = Number(process.env.PORT);

const schema = createSchema({
  typeDefs,
  resolvers,
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api",
  graphiql: true,
});

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

server.listen(port, () => {
  console.info(`🚀 [server]: http://localhost:${port}/api`);
});

// (async function () {
//   const port = Number(process.env.PORT);

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await startStandaloneServer(server, {
//     listen: { port },
//     context: async ({ req, res }) => ({}),
//   });

//   //seedDb();

//   console.log(`🚀 [server]: http://localhost:${port}`);
// })();
