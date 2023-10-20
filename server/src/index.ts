require("dotenv").config();

import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql";

(async function () {
  const port = Number(process.env.PORT);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //@ts-ignore
  await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => ({ req, res }),
  });

  console.log(`🚀 [server]: http://localhost:${port}`);
})();
