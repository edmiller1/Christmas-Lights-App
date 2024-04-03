import { Request, Response } from "express";
import { prisma } from "../../../database";
import {
  EditAvatarArgs,
  EditNameArgs,
  GetUserArgs,
  SearchUserfavouritesArgs,
  SignInArgs,
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
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Notification[]> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
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
          throw new Error("Not authenticated");
        }

        const userUnreadNotificationsCount = await prisma.notification.count({
          where: {
            user_id: user.id,
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
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        const favourites = await prisma.decoration.findMany({
          where: {
            AND: [
              {
                favourited_by_id: user.id,
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
              stripe_customer_id: null,
              email: input.result.email,
              image: input.result.photoURL,
              name: input.result.name,
              token: input.result.token,
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
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
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
          throw new Error("Not authenticated");
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
    ): Promise<User | null> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
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
