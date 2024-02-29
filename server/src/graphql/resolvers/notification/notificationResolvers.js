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
exports.notificationResolvers = void 0;
const database_1 = require("../../../database");
const helpers_1 = require("../../../lib/helpers");
exports.notificationResolvers = {
    Query: {},
    Mutation: {
        markNotificationAsRead: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.notification.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        unread: false,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        markNotificationAsUnread: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.notification.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        unread: true,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        markAllNotificationsAsRead: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.notification.updateMany({
                    where: {
                        user_id: user.id,
                    },
                    data: {
                        unread: false,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        deleteNotification: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.notification.delete({
                    where: {
                        id: input.id,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        deleteAllNotifications: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.notification.deleteMany({
                    where: {
                        user_id: user.id,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    Notification: {
        id: (notification) => {
            return notification.id;
        },
    },
};
