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
exports.routeResolvers = void 0;
const database_1 = require("../../../database");
const helpers_1 = require("../../../lib/helpers");
exports.routeResolvers = {
    Query: {},
    Mutation: {
        createRoute: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                if (input.decorationId) {
                    yield database_1.prisma.route.create({
                        data: {
                            name: input.name,
                            user_id: user.id,
                            decorations: {
                                connect: {
                                    id: input.decorationId,
                                },
                            },
                        },
                    });
                }
                else {
                    yield database_1.prisma.route.create({
                        data: {
                            name: input.name,
                            user_id: user.id,
                        },
                    });
                }
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        addDecorationToRoute: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("user cannot be found");
                }
                const userDecorations = user.routes.map((item) => item.decorations);
                const exists = userDecorations[0].some((decoration) => decoration.id === input.decorationId);
                if (exists) {
                    throw new Error("Decoration already exists in route");
                }
                else {
                    yield database_1.prisma.route.update({
                        where: {
                            id: input.routeId,
                        },
                        data: {
                            decorations: {
                                connect: {
                                    id: input.decorationId,
                                },
                            },
                        },
                    });
                }
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        removeDecorationFromRoute: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.route.update({
                    where: {
                        id: input.routeId,
                    },
                    data: {
                        decorations: {
                            disconnect: {
                                id: input.decorationId,
                            },
                        },
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        deleteRoute: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.route.delete({
                    where: {
                        id: input.routeId,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
};
