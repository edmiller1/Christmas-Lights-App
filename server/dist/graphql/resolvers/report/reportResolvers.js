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
exports.reportResolvers = void 0;
const database_1 = require("../../../database");
exports.reportResolvers = {
    Query: {
        getRecentReports: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const reports = yield database_1.prisma.report.findMany({
                    where: {
                        unresolved: true,
                    },
                    skip: 0,
                    take: 10,
                    orderBy: {
                        created_at: "desc",
                    },
                    include: {
                        decoration: true,
                    },
                });
                return reports;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
        getUnresolvedReportsCount: (_root, {}, { _, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const count = yield database_1.prisma.report.count({
                    select: {
                        unresolved: true,
                    },
                });
                return count.unresolved;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }),
    },
    Report: {
        id: (report) => {
            return report.id;
        },
    },
};
