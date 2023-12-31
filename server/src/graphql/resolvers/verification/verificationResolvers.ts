import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Verification } from "@prisma/client";
import { GetVerificationRequestsArgs } from "./types";

export const verificationResolvers = {
  Query: {
    getVerificationRequests: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Verification[]> => {
      try {
        const verifications = await prisma.verification.findMany({
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
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getVerificationRequestsCount: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<number> => {
      try {
        const count = await prisma.verification.count({
          select: {
            new: true,
          },
        });

        return count.new;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Verification: {
    id: (verification: Verification): string => {
      return verification.id;
    },
  },
};
