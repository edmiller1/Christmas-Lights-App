import { Request, Response } from "express";
import { prisma } from "../../../database";
import {
  DeleteAccountArgs,
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
import { Resend } from "resend";
import { welcomeEmail } from "../../../lib/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        const alreadyHasAccount = await prisma.user.findFirst({
          where: {
            id: input.result.id,
          },
        });

        if (!alreadyHasAccount) {
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

          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "edmiller.me@gmail.com",
            subject: "Welcome to Christmas Lights App",
            html: welcomeEmail,
          });
        } else {
          user = await prisma.user.update({
            where: {
              id: input.result.id,
            },
            data: {
              token: input.result.token,
            },
          });
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
    deleteAccount: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<String> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        //Send email to admin so they can delete user from Kinde
        await resend.emails.send({
          from: "'Christmas Lights App <christmaslightsapp.com>'",
          to: "edmiller.me@gmail.com",
          subject: "Account Deletion",
          html: `<p>User ${user.name} wishes to have their account deleted.</p>
          <p>Please log into the Kinde authentication portal and delete user.</p>
          &nbsp;
          <p>Please make sure to check Supabase DB for the user and any decorations the user may have before deleting from Kinde.</p>
          &nbsp;
          <ul>
            <li>User Id: ${user.id}</li>
            <li>User name: ${user.name}</li>
            <li>User email: ${user.email}</li>
          </ul>
          `,
        });

        //Get User Decorations
        const decorations = await prisma.decoration.findMany({
          where: {
            creator_id: user.id,
          },
          include: {
            images: true,
          },
        });

        //Delete Voews, Ratings and Images from each decoration
        decorations.forEach(async (decoration) => {
          const decorationImages = decoration.images;

          const deletedViews = prisma.view.deleteMany({
            where: {
              decoration_id: decoration.id,
            },
          });

          const deletedRatings = prisma.rating.deleteMany({
            where: {
              decoration_id: decoration.id,
            },
          });

          const deletedImages = prisma.decorationImage.deleteMany({
            where: {
              decoration_id: decoration.id,
            },
          });

          decorationImages?.forEach((image) => {
            Cloudinary.destroy(image.id);
          });

          const transaction = await prisma.$transaction([
            deletedViews,
            deletedImages,
            deletedRatings,
          ]);

          if (!transaction) {
            throw new Error("Failed to delete account");
          }
        });

        const deletedNotifications = prisma.notification.deleteMany({
          where: {
            user_id: user.id,
          },
        });

        const deletedDecorations = prisma.decoration.deleteMany({
          where: {
            creator_id: user.id,
          },
        });

        const deletedUser = prisma.user.delete({
          where: {
            id: user.id,
          },
        });

        if (user.imageId) {
          Cloudinary.destroy(user.imageId);
        }

        //delete user decorations + user account
        const transaction = await prisma.$transaction([
          deletedDecorations,
          deletedNotifications,
          deletedUser,
        ]);

        if (!transaction) {
          throw new Error("Failed to delete account.");
        }

        //If all goes well, we return a string
        return "Success";
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
