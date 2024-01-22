import { Request, Response } from "express";
import { prisma } from "../../../database";
import { authorise } from "../../../lib/helpers";
import { CreateRouteArgs } from "./types";
import { User } from "@prisma/client";

export const routeResolvers = {
  Query: {},
  Mutation: {
    createRoute: async (
      _root: undefined,
      { input }: CreateRouteArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        if (input.decorationId) {
          await prisma.route.create({
            data: {
              name: input.name,
              user_id: user.id,
              decorations: {
                connect: {
                  id: input.decorationId,
                },
              },
            },
          });
        } else {
          await prisma.route.create({
            data: {
              name: input.name,
              user_id: user.id,
            },
          });
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};
