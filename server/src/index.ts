require("dotenv").config();
//@ts-ignore
const kindeNode = require("kinde-node");

import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql";

let authorize: any;

(async () => {
  authorize = await kindeNode(process.env.KINDE_DOMAIN);
})();

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

  context: async ({ req, res }: { req: Request; res: Response }) => {
    // auth check on every request
    const user = new Promise((resolve, reject) => {
      authorize(req, (err: any, user: any) => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });

    return {
      user,
    };
  };

  //seedDb();

  console.log(`🚀 [server]: http://localhost:${port}`);
})();
