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
exports.userResolvers = void 0;
const database_1 = require("../../../database");
const helpers_1 = require("../../../lib/helpers");
const cloudinary_1 = require("../../../lib/cloudinary");
exports.userResolvers = {
    Query: {
        getUser: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield database_1.prisma.user.findFirst({
                    where: {
                        id: input.id,
                    },
                    include: {
                        ratings: true,
                        favourites: {
                            include: {
                                images: true,
                            },
                        },
                        notifications: true,
                        decorations: {
                            include: {
                                images: true,
                            },
                        },
                        history: {
                            include: {
                                images: true,
                            },
                        },
                        routes: {
                            include: {
                                decorations: {
                                    include: {
                                        images: true,
                                    },
                                },
                            },
                        },
                    },
                });
                if (!user) {
                    throw new Error("User cannot be found");
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to get user - ${error}`);
            }
        }),
        getUserNotifications: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const userNotifications = yield database_1.prisma.notification.findMany({
                    where: {
                        user_id: user.id,
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                });
                return userNotifications;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getUnreadNotifications: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const userNotificationsCount = yield database_1.prisma.notification.count({
                    where: {
                        user_id: user.id,
                        unread: true,
                    },
                });
                return userNotificationsCount;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        searchUserFavourites: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const favourites = yield database_1.prisma.decoration.findMany({
                    where: {
                        AND: [
                            {
                                favourited_by_id: user.id,
                            },
                        ],
                        OR: [
                            {
                                name: {
                                    contains: input.searchTerm,
                                    mode: "insensitive",
                                },
                            },
                            {
                                city: {
                                    contains: input.searchTerm,
                                    mode: "insensitive",
                                },
                            },
                            {
                                address: {
                                    contains: input.searchTerm,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    },
                });
                return favourites;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    Mutation: {
        signIn: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let user = null;
                const isNewUser = yield database_1.prisma.user.findFirst({
                    where: {
                        id: input.result.id,
                    },
                });
                if (!isNewUser) {
                    user = yield database_1.prisma.user.create({
                        data: {
                            id: input.result.id,
                            email: input.result.email,
                            image: input.result.photoURL,
                            name: input.result.name,
                            token: input.result.accessToken,
                            provider: input.result.provider,
                            notifications_by_email_rating: true,
                            notifications_by_email_verification: true,
                            notifications_on_app_rating: true,
                            notifications_on_app_verification: true,
                            premium: false,
                        },
                    });
                }
                else {
                    user = isNewUser;
                }
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        createUser: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield database_1.prisma.user.findFirst({
                    where: {
                        id: input.id,
                    },
                });
                if (user) {
                    const updateUser = yield database_1.prisma.user.update({
                        where: {
                            id: input.id,
                        },
                        data: {
                            token: input.token,
                        },
                    });
                    return updateUser;
                }
                else {
                    return yield database_1.prisma.user.create({
                        data: {
                            id: input.id,
                            email: input.email,
                            image: input.image,
                            name: input.name,
                            notifications_by_email_rating: true,
                            notifications_by_email_verification: true,
                            notifications_on_app_rating: true,
                            notifications_on_app_verification: true,
                            premium: false,
                            provider: input.provider,
                            token: input.token,
                        },
                    });
                }
            }
            catch (error) {
                throw new Error(`Failed to create new user - ${error}`);
            }
        }),
        editName: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        name: input.name,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        editAvatar: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                if (input.imageId !== null) {
                    yield cloudinary_1.Cloudinary.destroy(input.imageId);
                }
                const newImage = yield cloudinary_1.Cloudinary.uploadAvatar(input.image);
                yield database_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        image: newImage.url,
                        imageId: newImage.id,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`Failed - ${error}`);
            }
        }),
        mutateNotficationSettings: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                if (input.name === "onAppVerification") {
                    yield database_1.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            notifications_on_app_verification: input.setting,
                        },
                    });
                }
                else if (input.name === "onAppRating") {
                    yield database_1.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            notifications_on_app_rating: input.setting,
                        },
                    });
                }
                else if (input.name === "byEmailVerification") {
                    yield database_1.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            notifications_by_email_verification: input.setting,
                        },
                    });
                }
                else if (input.name === "byEmailRating") {
                    yield database_1.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            notifications_by_email_rating: input.setting,
                        },
                    });
                }
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    User: {
        id: (user) => {
            return user.id;
        },
    },
};
