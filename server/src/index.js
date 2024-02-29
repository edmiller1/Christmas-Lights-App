"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_1 = require("./graphql");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const port = Number(process.env.PORT);
        const server = new server_1.ApolloServer({
            typeDefs: graphql_1.typeDefs,
            resolvers: graphql_1.resolvers,
        });
        //@ts-ignore
        yield (0, standalone_1.startStandaloneServer)(server, {
            listen: { port },
            context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () { return ({ req, res }); }),
        });
        //seedDb();
        console.log(`🚀 [server]: http://localhost:${port}`);
    });
})();
