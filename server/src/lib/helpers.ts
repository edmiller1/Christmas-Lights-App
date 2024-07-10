import { DecorationImage } from "@prisma/client";
import { prisma } from "../database";
import { Request } from "express";
import { Cloudinary } from "./cloudinary";

export const authorise = async (req: Request) => {
  const token = req.get("X-CSRF-TOKEN");

  return token;
};

export const calculateRating = async (
  decorationId: string
): Promise<number> => {
  const decoration = await prisma.decoration.findFirst({
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

  let totalRatings: number = 0;
  let ratingResult: number = 0;

  decoration.ratings.forEach((rating) => {
    totalRatings += rating.rating;
  });

  ratingResult = totalRatings / decoration.ratings.length;

  return ratingResult ? ratingResult : decoration.rating;
};

export const optimizeImages = async (
  decorationId: string
): Promise<DecorationImage[]> => {
  const decoration = await prisma.decoration.findFirst({
    where: {
      id: decorationId,
    },
    include: {
      images: true,
    },
  });

  if (!decoration) {
    throw new Error("Decoration cannot be found");
  }

  // Map over the images array to optimize each image and return a new array of DecorationImage objects
  const optimizedImages = await Promise.all(
    decoration.images.map(async (image) => {
      await Cloudinary.optimize(image.id);
      // Assuming `image` has the properties required for DecorationImage
      return {
        // Include properties from the original image object as needed
        ...image,
        // Add any additional properties related to optimization (if applicable)
      };
    })
  );

  return optimizedImages;
};
