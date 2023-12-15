import cloudinary from "cloudinary";

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const Cloudinary = {
  upload: async (image: string) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder: "CLA_Assets/",
    });

    return { id: res.public_id, url: res.secure_url };
  },
  uploadVerification: async (image: string) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder: "CLA_Verifications/",
    });

    return { id: res.public_id, url: res.secure_url };
  },
  uploadAvatar: async (image: string) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder: "CLA_Avatars/",
    });

    return { id: res.public_id, url: res.secure_url };
  },
  destroy: async (id: string) => {
    await cloudinary.v2.uploader.destroy(id, {
      invalidate: true,
      resource_type: "image",
    });
  },
};
