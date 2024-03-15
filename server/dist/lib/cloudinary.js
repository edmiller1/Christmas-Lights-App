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
exports.Cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});
exports.Cloudinary = {
    upload: (image) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield cloudinary_1.default.v2.uploader.upload(image, {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            folder: "CLA_Assets/",
        });
        return { id: res.public_id, url: res.secure_url };
    }),
    uploadVerification: (image) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield cloudinary_1.default.v2.uploader.upload(image, {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            folder: "CLA_Verifications/",
        });
        return { id: res.public_id, url: res.secure_url };
    }),
    uploadAvatar: (image) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield cloudinary_1.default.v2.uploader.upload(image, {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            folder: "CLA_Avatars/",
        });
        return { id: res.public_id, url: res.secure_url };
    }),
    destroy: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield cloudinary_1.default.v2.uploader.destroy(id, {
            invalidate: true,
            resource_type: "image",
        });
    }),
};
