import { Request, Response } from "express";
import { prisma } from "../../../database";
import { authorise } from "../../../lib/helpers";
import {
  AddDecorationToRouteArgs,
  CreateRouteArgs,
  DeleteRouteArgs,
  RemoveDecorationFromRouteArgs,
} from "./types";
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
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: input.userId,
          },
        });

        if (!user) {
          throw new Error("Must have an account to create a route");
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
    addDecorationToRoute: async (
      _root: undefined,
      { input }: AddDecorationToRouteArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: input.userId,
          },
          include: {
            routes: {
              include: {
                decorations: true,
              },
            },
          },
        });

        if (!user) {
          throw new Error("Must have an account to create a route");
        }

        const userDecorations = user.routes.map((item) => item.decorations);

        const exists = userDecorations[0].some(
          (decoration) => decoration.id === input.decorationId
        );

        if (exists) {
          throw new Error("Decoration already exists in route");
        } else {
          await prisma.route.update({
            where: {
              id: input.routeId,
            },
            data: {
              decorations: {
                connect: {
                  id: input.decorationId,
                },
              },
            },
          });
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    removeDecorationFromRoute: async (
      _root: undefined,
      { input }: RemoveDecorationFromRouteArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: input.userId,
          },
        });

        if (!user) {
          throw new Error("Must have an account to remove decorations");
        }

        await prisma.route.update({
          where: {
            id: input.routeId,
          },
          data: {
            decorations: {
              disconnect: {
                id: input.decorationId,
              },
            },
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteRoute: async (
      _root: undefined,
      { input }: DeleteRouteArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("User cannot be found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: input.userId,
          },
        });

        if (!user) {
          throw new Error("Must have an account to remove routes");
        }

        await prisma.route.delete({
          where: {
            id: input.routeId,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};
