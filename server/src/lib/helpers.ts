import { Request } from "express";
import { prisma } from "../database";

export const authorise = async (req: Request) => {
  const token = req.get("x-csrf-token");
  const user = await prisma.user.findFirst({
    where: {
      token,
    },
    include: {
      history: true,
    },
  });
  return user;
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
