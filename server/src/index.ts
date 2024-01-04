require("dotenv").config();

import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql";
import { seedDb } from "../temp/seed";

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

  //seedDb();

  console.log(`🚀 [server]: http://localhost:${port}`);
})();
