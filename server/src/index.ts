require("dotenv").config();

import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql";
import { prisma } from "./database";
import { PrismaClient } from "@prisma/client";

(async function () {
  const port = Number(process.env.PORT);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => {
      const prisma = new PrismaClient();
      const token = req.headers.authorization;

      const user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });

      return { prisma, user };
    },
  });

  //seedDb();

  console.log(`🚀 [server]: http://localhost:${url}`);
})();
