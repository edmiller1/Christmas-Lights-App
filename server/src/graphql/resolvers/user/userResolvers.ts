import { Request, Response } from "express";
import { prisma } from "../../../database";
import { CreateUserArgs, GetUserArgs } from "./types";
import { User } from "@prisma/client";

export const userResolvers = {
  Query: {
    getUser: async (
      _root: undefined,
      { input }: GetUserArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: input.id,
          },
          include: {
            ratings: true,
            favourites: true,
            notifications: true,
          },
        });

        if (!user) {
          throw new Error("User cannot be found");
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to get user - ${error}`);
      }
    },
    getAllUsers: async () => {
      try {
        const users = await prisma.user.findMany();

        if (!users) {
          throw new Error("UH OH!");
        }
        return users;
      } catch (error) {
        throw new Error(`failed - ${error}`);
      }
    },
  },
  Mutation: {
    createUser: async (
      _root: undefined,
      { input }: CreateUserArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: input.id,
          },
        });

        if (user) {
          const updateUser = await prisma.user.update({
            where: {
              id: input.id,
            },
            data: {
              token: input.token,
            },
          });
          return updateUser;
        } else {
          return await prisma.user.create({
            data: {
              id: input.id,
              email: input.email,
              image: input.image,
              name: input.name,
              notifications_by_email_rating: true,
              notifications_by_email_verification: true,
              notifications_on_app_rating: true,
              notifications_on_app_verification: true,
              premium: false,
              provider: input.provider,
              token: input.token,
              created_at: input.createdAt,
            },
          });
        }
      } catch (error) {
        throw new Error(`Failed to create new user - ${error}`);
      }
    },
  },
  User: {
    id: (user: User): string => {
      return user.id;
    },
  },
};
