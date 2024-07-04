require("dotenv").config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { resolvers, typeDefs } from "./graphql";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import { kindeClient, sessionManager } from "./lib/kinde";
import { prisma } from "./database";
import { startStandaloneServer } from "@apollo/server/standalone";

// (async function () {
//   const app = express();
//   const port = process.env.PORT;
//   const httpServer = http.createServer(app);

//   // Set up Apollo Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });
//   await server.start();

//   app.use(
//     cors(),
//     bodyParser.json(),
//     expressMiddleware(server, {
//       context: async ({ req }) => {
//         //add token ot user to context
//         const token = req.get("authorization");
//         return { prisma, token };
//       },
//     })
//   );

//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port: port }, resolve)
//   );
//   console.log(`🚀 [server]: http://localhost:${port}`);
// })();

(async function () {
  const port = Number(process.env.PORT);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const token = req.headers.authorization;

      return { prisma, token };
    },
  });

  //seedDb();

  console.log(`🚀 [server]: ${url}`);
})();
