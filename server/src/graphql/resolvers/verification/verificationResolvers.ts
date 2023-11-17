import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Verification } from "@prisma/client";
import { GetVerificationRequestsArgs } from "./types";

export const verificationResolvers = {
  Query: {
    getVerificationRequests: async (
      _root: undefined,
      { input }: GetVerificationRequestsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Verification[]> => {
      try {
        const verifications = await prisma.verification.findMany({
          skip: input.skip,
          take: input.take,
          orderBy: {
            created_At: "desc",
          },
        });

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
