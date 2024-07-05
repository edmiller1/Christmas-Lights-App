require("dotenv").config();

import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./graphql";
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

  await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => ({
      token: req.headers.authorization,
    }),
  });

  //seedDb();

  console.log(`🚀 [server]: http://localhost:${port}`);
})();
