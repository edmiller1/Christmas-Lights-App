import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Report } from "@prisma/client";

export const reportResolvers = {
  Query: {
    getRecentReports: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Report[]> => {
      try {
        const reports = await prisma.report.findMany({
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
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getUnresolvedReportsCount: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<number> => {
      try {
        const count = await prisma.report.count({
          select: {
            unresolved: true,
          },
        });

        return count.unresolved;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Report: {
    id: (report: Report): string => {
      return report.id;
    },
  },
};
