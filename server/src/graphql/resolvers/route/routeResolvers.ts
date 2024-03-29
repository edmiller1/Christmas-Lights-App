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
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
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
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        await prisma.user.findFirst({
          where: {
            id: user.id,
          },
          include: {
            routes: {
              include: {
                decorations: true,
              },
            },
          },
        });

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
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
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
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
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
