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
exports.verificationResolvers = void 0;
const database_1 = require("../../../database");
exports.verificationResolvers = {
    Query: {
        getVerificationRequests: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const verifications = yield database_1.prisma.verification.findMany({
                    skip: 0,
                    take: 10,
                    orderBy: {
                        created_At: "desc",
                    },
                    include: {
                        decoration: true,
                    },
                });
                return verifications;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getVerificationRequestsCount: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const count = yield database_1.prisma.verification.count({
                    select: {
                        new: true,
                    },
                });
                return count.new;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    Verification: {
        id: (verification) => {
            return verification.id;
        },
    },
};
