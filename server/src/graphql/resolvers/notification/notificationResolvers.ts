import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Notification, User } from "@prisma/client";
import { MutateNotificationArgs } from "./types";
import { ApolloContext } from "../../../lib/types";
import { jwtDecode } from "jwt-decode";

export const notificationResolvers = {
  Query: {},
  Mutation: {
    markNotificationAsRead: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
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

        await prisma.notification.update({
          where: {
            id: input.id,
          },
          data: {
            unread: false,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    markNotificationAsUnread: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
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

        await prisma.notification.update({
          where: {
            id: input.id,
          },
          data: {
            unread: true,
          },
        });

        if (!user) {
          throw new Error("Failed to update notification");
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    markAllNotificationsAsRead: async (
      _root: undefined,
      {},
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
        await prisma.notification.updateMany({
          where: {
            user_id: user.id,
          },
          data: {
            unread: false,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteNotification: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
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

        await prisma.notification.delete({
          where: {
            id: input.id,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteAllNotifications: async (
      _root: undefined,
      {},
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

        await prisma.notification.deleteMany({
          where: {
            user_id: user.id,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Notification: {
    id: (notification: Notification): string => {
      return notification.id;
    },
  },
};
