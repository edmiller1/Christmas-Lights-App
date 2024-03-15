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
exports.calculateRating = exports.authorise = void 0;
const database_1 = require("../database");
const authorise = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("x-csrf-token");
    const user = yield database_1.prisma.user.findFirst({
        where: {
            token,
        },
        include: {
            history: true,
            routes: {
                include: {
                    decorations: true,
                },
            },
        },
    });
    return user;
});
exports.authorise = authorise;
const calculateRating = (decorationId) => __awaiter(void 0, void 0, void 0, function* () {
    const decoration = yield database_1.prisma.decoration.findFirst({
        where: {
            id: decorationId,
        },
        include: {
            ratings: true,
        },
    });
    if (!decoration) {
        throw new Error("Decoration cannot be found");
    }
    let totalRatings = 0;
    let ratingResult = 0;
    decoration.ratings.forEach((rating) => {
        totalRatings += rating.rating;
    });
    ratingResult = totalRatings / decoration.ratings.length;
    return ratingResult ? ratingResult : decoration.rating;
});
exports.calculateRating = calculateRating;
