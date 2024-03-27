import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Notification, User } from "@prisma/client";
import { MutateAllNotificationsArgs, MutateNotificationArgs } from "./types";
import { authorise } from "../../../lib/helpers";

export const notificationResolvers = {
  Query: {},
  Mutation: {
    markNotificationAsRead: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const [user] = await prisma.$transaction([
          prisma.user.findFirst({
            where: {
              id: input.userId,
            },
          }),
          prisma.notification.update({
            where: {
              id: input.id,
            },
            data: {
              unread: false,
            },
          }),
        ]);

        if (!user) {
          throw new Error("Failed to update notification");
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    markNotificationAsUnread: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const [user] = await prisma.$transaction([
          prisma.user.findFirst({
            where: {
              id: input.userId,
            },
          }),
          prisma.notification.update({
            where: {
              id: input.id,
            },
            data: {
              unread: true,
            },
          }),
        ]);

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
      { input }: MutateAllNotificationsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const [user] = await prisma.$transaction([
          prisma.user.findFirst({
            where: {
              id: input.userId,
            },
          }),
          prisma.notification.updateMany({
            where: {
              user_id: input.userId,
            },
            data: {
              unread: false,
            },
          }),
        ]);

        if (!user) {
          throw new Error("Failed to update notification");
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteNotification: async (
      _root: undefined,
      { input }: MutateNotificationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const token = await authorise(req);

        if (!token) {
          throw new Error("Not authenticated");
        }

        const [user] = await prisma.$transaction([
          prisma.user.findFirst({
            where: {
              id: input.userId,
            },
          }),
          prisma.notification.delete({
            where: {
              id: input.id,
            },
          }),
        ]);

        if (!user) {
          throw new Error("Failed to update notification");
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteAllNotifications: async (
      _root: undefined,
      { input }: MutateAllNotificationsArgs,
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
          throw new Error("Must have an account to delete all notifications");
        }

        await prisma.notification.deleteMany({
          where: {
            user_id: input.userId,
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
