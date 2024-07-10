import { prisma } from "../../../database";
import {
  AddDecorationToRouteArgs,
  CreateRouteArgs,
  DeleteRouteArgs,
  RemoveDecorationFromRouteArgs,
} from "./types";
import { User } from "@prisma/client";
import { ApolloContext } from "../../../lib/types";
import { jwtDecode } from "jwt-decode";

export const routeResolvers = {
  Query: {},
  Mutation: {
    createRoute: async (
      _root: undefined,
      { input }: CreateRouteArgs,
      context: any
    ): Promise<User> => {
      try {
        const token = context.request.headers.get("authorization");
        const decodedToken = jwtDecode(token || "");

        if (!decodedToken) {
          throw new Error("Token not found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
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
      context: any
    ): Promise<User> => {
      try {
        const token = context.request.headers.get("authorization");
        const decodedToken = jwtDecode(token || "");

        if (!decodedToken) {
          throw new Error("Token not found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
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
          throw new Error("User not found");
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
      context: any
    ): Promise<User> => {
      try {
        const token = context.request.headers.get("authorization");
        const decodedToken = jwtDecode(token || "");

        if (!decodedToken) {
          throw new Error("Token not found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
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
      context: any
    ): Promise<User> => {
      try {
        const token = context.request.headers.get("authorization");
        const decodedToken = jwtDecode(token || "");

        if (!decodedToken) {
          throw new Error("Token not found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

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
