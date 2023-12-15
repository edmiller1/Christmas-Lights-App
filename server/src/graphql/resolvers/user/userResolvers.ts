import { Request, Response } from "express";
import { prisma } from "../../../database";
import {
  CreateUserArgs,
  EditAvatarArgs,
  EditNameArgs,
  GetUserArgs,
  mutateNotficationSettingsArgs,
} from "./types";
import { Notification, User } from "@prisma/client";
import { authorise } from "../../../lib/helpers";
import { Cloudinary } from "../../../lib/cloudinary";

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
            decorations: {
              include: {
                images: true,
              },
            },
            history: {
              include: {
                images: true,
              },
            },
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
    getUserNotifications: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Notification[]> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const userNotifications = await prisma.notification.findMany({
          where: {
            user_id: user.id,
          },
          orderBy: {
            created_at: "desc",
          },
        });

        return userNotifications;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getUnreadNotifications: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<number> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const userNotificationsCount = await prisma.notification.count({
          where: {
            user_id: user.id,
            unread: true,
          },
        });

        return userNotificationsCount;
      } catch (error) {
        throw new Error(`${error}`);
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
    editName: async (
      _root: undefined,
      { input }: EditNameArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: input.name,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    editAvatar: async (
      _root: undefined,
      { input }: EditAvatarArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        if (input.imageId !== null) {
          await Cloudinary.destroy(input.imageId);
        }

        const newImage = await Cloudinary.uploadAvatar(input.image);

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            image: newImage.url,
            imageId: newImage.id,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`Failed - ${error}`);
      }
    },
    mutateNotficationSettings: async (
      _root: undefined,
      { input }: mutateNotficationSettingsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        if (input.name === "onAppVerification") {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              notifications_on_app_verification: input.setting,
            },
          });
        } else if (input.name === "onAppRating") {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              notifications_on_app_rating: input.setting,
            },
          });
        } else if (input.name === "byEmailVerification") {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              notifications_by_email_verification: input.setting,
            },
          });
        } else if (input.name === "byEmailRating") {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              notifications_by_email_rating: input.setting,
            },
          });
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  User: {
    id: (user: User): string => {
      return user.id;
    },
  },
};
