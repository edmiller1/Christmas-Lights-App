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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorationResolvers = void 0;
const database_1 = require("../../../database");
const helpers_1 = require("../../../lib/helpers");
const cloudinary_1 = require("../../../lib/cloudinary");
const resend_1 = require("resend");
const node_fetch_1 = __importDefault(require("node-fetch"));
const resend = new resend_1.Resend("re_H1GDoBf9_Kwqwhasy8MZsLo6Tn3ej8bBc");
exports.decorationResolvers = {
    Query: {
        getDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                const decoration = yield database_1.prisma.decoration.findFirst({
                    where: {
                        id: input.id,
                    },
                    include: {
                        creator: true,
                        ratings: true,
                        images: true,
                        views: true,
                    },
                });
                if (!decoration) {
                    throw new Error("Decoration cannot be found");
                }
                //rethink verified logic
                if (user && decoration.creator_id !== user.id && !decoration.verified) {
                    throw new Error("decoration is not verified");
                }
                return decoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getRecommendedDecorations: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const decorations = yield database_1.prisma.decoration.findMany({
                    where: {
                        city: input.city,
                        verified: true,
                        NOT: {
                            id: input.id,
                        },
                    },
                    skip: 0,
                    take: 8,
                    include: {
                        images: true,
                    },
                });
                if (!decorations) {
                    throw new Error("Decorations cannot be found!");
                }
                return decorations;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getVerificationSubmissions: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const decorations = yield database_1.prisma.decoration.findMany({
                    where: {
                        verification_submitted: true,
                    },
                });
                return decorations;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getDecorationsByCity: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let city = null;
                let decorations = null;
                const latitude = req.get("latitude");
                const longitude = req.get("longitude");
                if (latitude && longitude) {
                    const response = yield (0, node_fetch_1.default)(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}`);
                    const jsonData = yield response.json();
                    if (jsonData.features) {
                        city = jsonData.features.find((item) => {
                            item.place_type.includes("place");
                        });
                    }
                    decorations = yield database_1.prisma.decoration.findMany({
                        where: {
                            city: city === null || city === void 0 ? void 0 : city.text,
                            verified: true,
                        },
                        include: {
                            images: true,
                        },
                        skip: 0,
                        take: 18,
                    });
                }
                else {
                    decorations = yield database_1.prisma.decoration.findMany({
                        where: {
                            OR: [
                                {
                                    country: "New Zealand",
                                },
                                {
                                    country: "Australia",
                                },
                            ],
                            verified: true,
                        },
                        include: {
                            images: true,
                        },
                        skip: 0,
                        take: 18,
                    });
                }
                return decorations;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getDecorationsByRating: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const decorations = yield database_1.prisma.decoration.findMany({
                    where: {
                        rating: {
                            gt: 3.5,
                        },
                        verified: true,
                    },
                    include: {
                        images: true,
                    },
                    skip: 0,
                    take: 18,
                });
                return decorations;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getDecorationsViaCountry: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let country = null;
                let decorations = null;
                let count = 0;
                if (input.latitude && input.longitude) {
                    const response = yield (0, node_fetch_1.default)(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=country&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`);
                    const jsonData = yield response.json();
                    if (jsonData.features) {
                        country = jsonData.features[0];
                    }
                    decorations = yield database_1.prisma.decoration.findMany({
                        where: {
                            country: country === null || country === void 0 ? void 0 : country.text,
                            verified: true,
                        },
                        include: {
                            images: true,
                        },
                        skip: input.skip,
                        take: 18,
                    });
                    count = yield database_1.prisma.decoration.count({
                        where: {
                            country: country === null || country === void 0 ? void 0 : country.text,
                            verified: true,
                        },
                    });
                }
                else {
                    throw new Error("Latitude and Longitude not provided.");
                }
                return { decorations: decorations, count: count, type: "country" };
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getDecorationsViaRegion: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let region = null;
                let decorations = null;
                let count = 0;
                if (input.latitude && input.longitude) {
                    const response = yield (0, node_fetch_1.default)(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=region&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`);
                    const jsonData = yield response.json();
                    if (jsonData.features) {
                        region = jsonData.features[0];
                    }
                    decorations = yield database_1.prisma.decoration.findMany({
                        where: {
                            region: region === null || region === void 0 ? void 0 : region.text,
                            verified: true,
                        },
                        include: {
                            images: true,
                        },
                        skip: input.skip,
                        take: 18,
                    });
                    count = yield database_1.prisma.decoration.count({
                        where: {
                            region: region === null || region === void 0 ? void 0 : region.text,
                            verified: true,
                        },
                    });
                }
                else {
                    throw new Error("Latitude and Longitude not provided.");
                }
                return { decorations: decorations, count: count, type: "region" };
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getDecorationsViaCity: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let city = null;
                let decorations = null;
                let count = 0;
                if (input.latitude && input.longitude) {
                    const response = yield (0, node_fetch_1.default)(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=place&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`);
                    const jsonData = yield response.json();
                    if (jsonData.features) {
                        city = jsonData.features[0];
                    }
                    decorations = yield database_1.prisma.decoration.findMany({
                        where: {
                            city: city === null || city === void 0 ? void 0 : city.text,
                            verified: true,
                        },
                        include: {
                            images: true,
                        },
                        skip: input.skip,
                        take: 18,
                    });
                    count = yield database_1.prisma.decoration.count({
                        where: {
                            city: city === null || city === void 0 ? void 0 : city.text,
                            verified: true,
                        },
                    });
                }
                else {
                    throw new Error("Latitude and Longitude not provided.");
                }
                return { decorations: decorations, count: count, type: "city" };
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        searchForDecorations: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [decorations, count] = yield database_1.prisma.$transaction([
                    database_1.prisma.decoration.findMany({
                        skip: input.skip,
                        take: 18,
                        where: {
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
                        include: {
                            images: true,
                        },
                    }),
                    database_1.prisma.decoration.count({
                        where: {
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
                    }),
                ]);
                return { decorations: decorations, count: count, type: "search" };
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    Mutation: {
        createDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let newDecoration = null;
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                // const regex = /\b\d{1,5}\s[\w\s'&.-]+,\s[\w\s'&.-]+\b/;
                // const isAddress = regex.test(input.address);
                // if (!isAddress) {
                //   throw new Error("Address provided is not valid.");
                // }
                const images = [];
                for (const image of input.images) {
                    const newImage = yield cloudinary_1.Cloudinary.upload(image);
                    images.push(newImage);
                }
                if (images.length > 0) {
                    newDecoration = yield database_1.prisma.decoration.create({
                        data: {
                            name: input.name,
                            address: input.address,
                            city: input.city,
                            country: input.country,
                            latitude: input.latitude,
                            longitude: input.longitude,
                            region: input.region,
                            num_ratings: 0,
                            num_views: 0,
                            rating: 0,
                            verification_submitted: false,
                            verified: false,
                            year: new Date().getFullYear().toString(),
                            creator_id: user.id,
                            images: {
                                create: images,
                            },
                            route_id: "",
                        },
                    });
                }
                return newDecoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        editDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const newImages = [];
                if (input.newImages) {
                    for (const image of input.newImages) {
                        const newImage = yield cloudinary_1.Cloudinary.upload(image);
                        newImages.push(newImage);
                    }
                }
                if (input.deletedImages) {
                    for (const image of input.deletedImages) {
                        yield cloudinary_1.Cloudinary.destroy(image.id);
                    }
                }
                const updatedDecoration = yield database_1.prisma.decoration.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        name: input.name,
                        address: input.address,
                        latitude: input.latitude,
                        longitude: input.longitude,
                        country: input.country,
                        region: input.region,
                        city: input.city,
                        images: {
                            create: newImages ? newImages : [],
                            deleteMany: input.deletedImages ? input.deletedImages : [],
                        },
                    },
                });
                return updatedDecoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        favouriteDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const updatedUser = yield database_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        favourites: {
                            connect: {
                                id: input.id,
                            },
                        },
                    },
                });
                return updatedUser;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        unfavouriteDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const updatedUser = yield database_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        favourites: {
                            disconnect: {
                                id: input.id,
                            },
                        },
                    },
                });
                return updatedUser;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        addView: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDecoration = yield database_1.prisma.decoration.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        num_views: input.numViews + 1,
                        views: {
                            create: {},
                        },
                    },
                });
                return updatedDecoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        rateDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const decoration = yield database_1.prisma.decoration.findFirst({
                    where: {
                        id: input.id,
                    },
                });
                if (!decoration) {
                    throw new Error("Decoration doesn't exist");
                }
                if (user.id === decoration.creator_id) {
                    throw new Error("Owner cannot rate their own decoration.");
                }
                const alreadyRated = yield database_1.prisma.rating.findFirst({
                    where: {
                        user_id: user.id,
                    },
                });
                if (alreadyRated) {
                    throw new Error("Decoration has already been rated by user. Please edit your rating.");
                }
                yield database_1.prisma.rating.create({
                    data: {
                        rating: input.rating,
                        decoration_id: input.id,
                        user_id: user.id,
                    },
                });
                const owner = yield database_1.prisma.user.findFirst({
                    where: {
                        id: decoration.creator_id,
                    },
                });
                if (!owner) {
                    throw new Error("Decoration must have an owner");
                }
                if (owner.notifications_by_email_rating) {
                    //send email to owner
                    yield resend.emails.send({
                        from: "Acme <onboarding@resend.dev>",
                        to: "edmiller.me@gmail.com",
                        subject: "New Decoration Rating",
                        html: `<p>New Decoration Rating</p>
            <p>Your decoration ${decoration.name} has recieved a new rating</p>
            &nbsp;
            <p>${decoration.name} recieved a rating of ${input.rating}</p>
            `,
                    });
                }
                if (owner.notifications_on_app_rating) {
                    //create notification
                    yield database_1.prisma.notification.create({
                        data: {
                            body: `⭐️ A new rating of ${input.rating} was recieved for your decoration: ${decoration.name}. ⭐️`,
                            title: "New Decoration Rating ⭐️",
                            unread: true,
                            user_id: owner.id,
                        },
                    });
                }
                return decoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        editRating: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.rating.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        rating: input.rating,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        deleteRating: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                yield database_1.prisma.rating.delete({
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
        reportDecoration: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User canot be found");
                }
                const decoration = yield database_1.prisma.decoration.findFirst({
                    where: {
                        id: input.id,
                    },
                });
                if (!decoration) {
                    throw new Error("Decoration cannot be found");
                }
                //create report
                yield database_1.prisma.report.create({
                    data: {
                        additional_info: input.additionalDetails,
                        unresolved: true,
                        decoration_id: decoration.id,
                        user_id: user.id,
                        reasons: input.reportOptions,
                    },
                });
                //Send email to CLA admin
                yield resend.emails.send({
                    from: "Acme <onboarding@resend.dev>",
                    to: "edmiller.me@gmail.com",
                    subject: "New Decoration Report",
                    html: `<p>New Decoration Report</p>
          <p>Reported by: ${user.name}</p>
          <ul>
            <li>ID: ${user.id}</li>
            <li>Email: ${user.email}</li>
          </ul>
          <p>Reported Decoration:</p>
          <ul>
          <li>ID: ${decoration.id}</li>
          <li>Name: ${decoration.name}</li>
          <li>Address: ${decoration.address}</li>
          <li>ChristmasLightsApp link: http://localhost:3000/decoration/${decoration.id}/</li>
          </ul>
          <span>Reasons for Report</span>
          <ul>
          <li>${input.reportOptions.map((ro) => ro)}</li>
          </ul>
          <p>Additional Details:</p>
          <p>${input.additionalDetails}</p>
          `,
                    text: "It Worked!!!",
                    tags: [
                        {
                            name: "decoration_report",
                            value: "decoration_report",
                        },
                    ],
                });
                return decoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        submitDecorationForVerification: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const decoration = yield database_1.prisma.decoration.findFirst({
                    where: {
                        id: input.id,
                    },
                });
                if ((decoration === null || decoration === void 0 ? void 0 : decoration.verification_submitted) || (decoration === null || decoration === void 0 ? void 0 : decoration.verified)) {
                    throw new Error("Decoration has already submitted a request for verification or is already verified");
                }
                //upload image to Cloudinary
                const document = yield cloudinary_1.Cloudinary.uploadVerification(input.document);
                const updatedDecoration = yield database_1.prisma.decoration.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        verification_submitted: true,
                    },
                });
                yield database_1.prisma.verification.create({
                    data: {
                        document: document.url,
                        decoration_id: updatedDecoration.id,
                        new: true,
                        archived: false,
                        approved: false,
                        rejected: false,
                        rejected_reason: "",
                    },
                });
                //email admin about new verification_submitted
                yield resend.emails.send({
                    from: "Acme <onboarding@resend.dev>",
                    to: "edmiller.me@gmail.com",
                    subject: "New Verification Request",
                    html: `<h1>New Verification Request<h1>
                  <p>User:</p>
                  <ul>
                  <li>ID: ${user.id}</li>
                  <li>Email: ${user.email}</li>
                  <li>Name: ${user.name}</li>
                </ul>
        
                <p>Decoration to be verified:</p>
                <ul>
                <li>URL: http://localhost:3000/decoration/${updatedDecoration.id}</li>
                <li>ID: ${updatedDecoration.id}</li>
                <li>Name: ${updatedDecoration.name}</li>
                <li>Address: ${updatedDecoration.address}</li>
                <li>Verification Image: ${document.url}</li>
                </ul>
                `,
                });
                //email user if they have allowed emails through notification settings
                if (user.notifications_by_email_verification) {
                }
                //create a notification for the user if they have allowed in app notifications
                if (user.notifications_on_app_verification) {
                    yield database_1.prisma.notification.create({
                        data: {
                            body: `Your verification submission for decoration: ${updatedDecoration.name} was successful. 
              We will notify you on whether your decoration is verified or not.`,
                            title: "Verification Submission",
                            unread: true,
                            user_id: user.id,
                        },
                    });
                }
                return updatedDecoration;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        addDecorationToHistory: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found");
                }
                const firstDecoration = user.history[0];
                const userHistoryCount = user.history.length;
                const exists = user.history.some((item) => item.id === input.id);
                //decoration already exists in user history
                if (exists) {
                    return user;
                }
                if (user.premium && !exists) {
                    if (userHistoryCount < 24) {
                        yield database_1.prisma.user.update({
                            where: {
                                id: user.id,
                            },
                            data: {
                                history: {
                                    connect: {
                                        id: input.id,
                                    },
                                },
                            },
                        });
                    }
                    else if (userHistoryCount === 24) {
                        yield database_1.prisma.user.update({
                            where: {
                                id: user.id,
                            },
                            data: {
                                history: {
                                    disconnect: {
                                        id: firstDecoration.id,
                                    },
                                    connect: {
                                        id: input.id,
                                    },
                                },
                            },
                        });
                    }
                }
                else if (!user.premium && !exists) {
                    if (userHistoryCount < 12) {
                        yield database_1.prisma.user.update({
                            where: {
                                id: user.id,
                            },
                            data: {
                                history: {
                                    connect: {
                                        id: input.id,
                                    },
                                },
                            },
                        });
                    }
                    else {
                        yield database_1.prisma.user.update({
                            where: {
                                id: user.id,
                            },
                            data: {
                                history: {
                                    disconnect: {
                                        id: firstDecoration.id,
                                    },
                                    connect: {
                                        id: input.id,
                                    },
                                },
                            },
                        });
                    }
                }
                return user;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        removeDecorationFromHistory: (_root, { input }, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, helpers_1.authorise)(req);
                if (!user) {
                    throw new Error("User cannot be found.");
                }
                yield database_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        history: {
                            disconnect: {
                                id: input.id,
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
    },
    Decoration: {
        id: (decoration) => {
            return decoration.id;
        },
        rating: (decoration) => {
            return (0, helpers_1.calculateRating)(decoration.id);
        },
    },
};
