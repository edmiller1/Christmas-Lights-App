import { Request } from "express";
import { prisma } from "../database";

export const authorise = async (req: Request) => {
  const token = req.get("x-csrf-token");
  const user = await prisma.user.findFirst({
    where: {
      token,
    },
  });
  return user;
};
