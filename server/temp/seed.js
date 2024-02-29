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
exports.seedDb = void 0;
const decoration_1 = require("../src/lib/decoration");
const decorationImage_1 = require("../src/lib/decorationImage");
const database_1 = require("../src/database");
const seedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🍁 [seed]: running...");
        yield database_1.prisma.decoration.createMany({
            data: decoration_1.decorations,
        });
        yield database_1.prisma.decorationImage.createMany({
            data: decorationImage_1.decorationImages,
        });
        console.log("🍁 [seed]: Success");
    }
    catch (error) {
        throw new Error(`Failed to seed database - ${error}`);
    }
});
exports.seedDb = seedDb;
