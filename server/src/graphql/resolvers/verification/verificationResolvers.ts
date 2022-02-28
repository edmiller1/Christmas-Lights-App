import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Verification } from "@prisma/client";

export const verificationResolvers = {
  Query: {
    getVerificationRequests: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Verification[]> => {
      try {
        const verifications = await prisma.verification.findMany();

        return verifications;
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
