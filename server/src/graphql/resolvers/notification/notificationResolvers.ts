import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Notification, User } from "@prisma/client";
import { MutateNotificationArgs } from "./types";
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
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
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
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        await prisma.notification.update({
          where: {
            id: input.id,
          },
          data: {
            unread: true,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    markAllNotificationsAsRead: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
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
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
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
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
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
