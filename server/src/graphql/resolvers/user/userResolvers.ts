import { Request, Response } from "express";
import { prisma } from "../../../database";
import {
  CreateSubscriptionSessionArgs,
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
import Stripe from "stripe";
import { update } from "lodash";
import { ApolloContext } from "../../../lib/types";
import { kindeClient, sessionManager } from "../../../lib/kinde";
import { jwtDecode } from "jwt-decode";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const userResolvers = {
  Query: {
    getUser: async (
      _root: undefined,
      context: ApolloContext
    ): Promise<User | null> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Token not found");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<Notification[]> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const userNotifications = await prisma.notification.findMany({
          where: {
            user_id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<number> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const userUnreadNotificationsCount = await prisma.notification.count({
          where: {
            user_id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<Decoration[]> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const favourites = await prisma.decoration.findMany({
          where: {
            AND: [
              {
                favourited_by_id: decodedToken.sub,
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
    createSubscriptionSession: async (
      _root: undefined,
      {},
      context: ApolloContext
    ) => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.premium) {
          throw new Error("User already has premium subscription");
        }

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: process.env.STRIPE_PREMIUM_PRICE_ID,
              quantity: 1,
            },
          ],
          customer_email: user.email,
          mode: "subscription",
          success_url: `${process.env.APP_URL}`,
          cancel_url: `${process.env.CANCEL_URL}`,
        });

        if (session) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripe_session_id: session.id,
            },
          });
        }

        return session.url;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    cancelSession: async (
      _root: undefined,
      {},
      context: ApolloContext
    ): Promise<String> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.stripe_session_id) {
          throw new Error("No session found");
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripe_session_id: null,
          },
        });

        return "success";
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    confirmSession: async (
      _root: undefined,
      {},
      context: ApolloContext
    ): Promise<User> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.premium) {
          throw new Error("User already has premium subscription");
        }

        if (!user.stripe_session_id) {
          throw new Error("No session found");
        }

        const session = await stripe.checkout.sessions.retrieve(
          user.stripe_session_id
        );

        if (!session) {
          throw new Error("Session not found");
        }
        if (session && session.status === "complete") {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              stripe_session_id: null,
              premium: true,
            },
          });
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    cancelSubscription: async (
      _root: undefined,
      {},
      context: ApolloContext
    ): Promise<User> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.stripe_subscription_id) {
          throw new Error("No subscription found");
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripe_subscription_id: null,
            premium: false,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    signIn: async (
      _root: undefined,
      { input }: SignInArgs
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
              token: "-",
              isAdmin: false,
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

          return user;
        }
        return alreadyHasAccount;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    editName: async (
      _root: undefined,
      { input }: EditNameArgs,
      context: ApolloContext
    ): Promise<User> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.update({
          where: {
            id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<User> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        if (input.imageId !== null) {
          await Cloudinary.destroy(input.imageId);
        }

        const newImage = await Cloudinary.uploadAvatar(input.image);

        const user = await prisma.user.update({
          where: {
            id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<User | null> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        let user: User | null = null;

        if (input.name === "onAppVerification") {
          user = await prisma.user.update({
            where: {
              id: decodedToken.sub,
            },
            data: {
              notifications_on_app_verification: input.setting,
            },
          });
        } else if (input.name === "onAppRating") {
          user = await prisma.user.update({
            where: {
              id: decodedToken.sub,
            },
            data: {
              notifications_on_app_rating: input.setting,
            },
          });
        } else if (input.name === "byEmailVerification") {
          user = await prisma.user.update({
            where: {
              id: decodedToken.sub,
            },
            data: {
              notifications_by_email_verification: input.setting,
            },
          });
        } else if (input.name === "byEmailRating") {
          user = await prisma.user.update({
            where: {
              id: decodedToken.sub,
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
      context: ApolloContext
    ): Promise<String> => {
      try {
        const decodedToken = jwtDecode(context.token || "");

        if (!decodedToken) {
          throw new Error("Not authenticated");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: decodedToken.sub,
          },
        });

        if (!user) {
          throw new Error("User not found");
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

        //Delete Views, Ratings and Images from each decoration
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
