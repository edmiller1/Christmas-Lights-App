import { Request, Response } from "express";
import { prisma } from "../../../database";
import {
  CreateUserArgs,
  EditAvatarArgs,
  EditNameArgs,
  GetUserArgs,
  SearchArgs,
  SearchUserfavouritesArgs,
  SignInArgs,
  getUnreadNotificationsArgs,
  getUserNotificationsArgs,
  mutateNotficationSettingsArgs,
} from "./types";
import { Decoration, Notification, User } from "@prisma/client";
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
            favourites: {
              include: {
                images: true,
              },
            },
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
            routes: {
              include: {
                decorations: {
                  include: {
                    images: true,
                  },
                },
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
      { input }: getUserNotificationsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Notification[]> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const userNotifications = await prisma.notification.findMany({
          where: {
            user_id: input.id,
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
      { input }: getUnreadNotificationsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<number> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const userUnreadNotificationsCount = await prisma.notification.count({
          where: {
            user_id: input.id,
            unread: true,
          },
        });

        return userUnreadNotificationsCount;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    searchUserFavourites: async (
      _root: undefined,
      { input }: SearchUserfavouritesArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration[]> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const favourites = await prisma.decoration.findMany({
          where: {
            AND: [
              {
                favourited_by_id: input.userId,
              },
            ],
            OR: [
              {
                name: {
                  contains: input.searchTerm,
                  mode: "insensitive",
                },
              },
              {
                city: {
                  contains: input.searchTerm,
                  mode: "insensitive",
                },
              },
              {
                address: {
                  contains: input.searchTerm,
                  mode: "insensitive",
                },
              },
            ],
          },
        });

        return favourites;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    signIn: async (
      _root: undefined,
      { input }: SignInArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User | null> => {
      try {
        let user: User | null = null;
        const isNewUser = await prisma.user.findFirst({
          where: {
            id: input.result.id,
          },
        });

        if (!isNewUser) {
          user = await prisma.user.create({
            data: {
              id: input.result.id,
              stripe_customer_id: "",
              email: input.result.email,
              image: input.result.photoURL,
              name: input.result.name,
              provider: input.result.provider,
              notifications_by_email_rating: true,
              notifications_by_email_verification: true,
              notifications_on_app_rating: true,
              notifications_on_app_verification: true,
              premium: false,
            },
          });
        } else {
          user = isNewUser;
        }
        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    editName: async (
      _root: undefined,
      { input }: EditNameArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const [updatedUser] = await prisma.$transaction([
          prisma.user.findFirst({
            where: {
              id: input.userId,
            },
          }),
          prisma.user.update({
            where: {
              id: input.userId,
            },
            data: {
              name: input.name,
            },
          }),
        ]);

        if (!updatedUser) {
          throw new Error("Failed to find user");
        }

        return updatedUser;
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
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        if (input.imageId !== null) {
          await Cloudinary.destroy(input.imageId);
        }

        const newImage = await Cloudinary.uploadAvatar(input.image);

        const user = await prisma.user.update({
          where: {
            id: input.userId,
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
    ): Promise<User | null> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        let user = null;

        if (input.name === "onAppVerification") {
          user = await prisma.user.update({
            where: {
              id: input.userId,
            },
            data: {
              notifications_on_app_verification: input.setting,
            },
          });
        } else if (input.name === "onAppRating") {
          user = await prisma.user.update({
            where: {
              id: input.userId,
            },
            data: {
              notifications_on_app_rating: input.setting,
            },
          });
        } else if (input.name === "byEmailVerification") {
          user = await prisma.user.update({
            where: {
              id: input.userId,
            },
            data: {
              notifications_by_email_verification: input.setting,
            },
          });
        } else if (input.name === "byEmailRating") {
          user = await prisma.user.update({
            where: {
              id: input.userId,
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
