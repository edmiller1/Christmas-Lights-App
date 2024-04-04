import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_NOTIFICATION,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_UNREAD,
} from "@/graphql/mutations";
import {
  DeleteNotification as DeleteNotificationData,
  DeleteNotificationArgs,
} from "@/graphql/mutations/deleteNotification/types";
import {
  MarkNotificationAsRead as MarkNotificationAsReadData,
  MarkNotificationAsReadArgs,
} from "@/graphql/mutations/markNotificationAsRead/types";
import {
  MarkNotificationAsUnread as MarkNotificationAsUnreadData,
  MarkNotificationAUnreadArgs,
} from "@/graphql/mutations/markNotificationAsUnread/types";
import { Get_User_Notifications } from "@/graphql/queries/getUserNotifications/types";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { CircleNotch } from "@phosphor-icons/react";
import { NotificationOptionsMenu } from "@/components/AppHeader/components/NotificationOptionsMenu";

interface Props {
  index: number;
  notification: Get_User_Notifications;
  notifications: Get_User_Notifications[];
  refetchUserNotifications: () => void;
}

export const NotificationItem = ({
  index,
  notification,
  notifications,
  refetchUserNotifications,
}: Props) => {
  const { toast } = useToast();

  const [currentNotificationIndex, setCurrentNotificationIndex] =
    useState<number>(0);

  const [deleteNotification, { loading: deleteNotificationLoading }] =
    useMutation<DeleteNotificationData, DeleteNotificationArgs>(
      DELETE_NOTIFICATION,
      {
        onCompleted: () => {
          refetchUserNotifications();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description: "Failed to delete notification. Please try again.",
          });
        },
      }
    );

  const [markNotificationAsRead, { loading: markNotificationAsReadLoading }] =
    useMutation<MarkNotificationAsReadData, MarkNotificationAsReadArgs>(
      MARK_NOTIFICATION_AS_READ,
      {
        onCompleted: () => {
          refetchUserNotifications();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description:
              "Failed to mark notification as read. Please try again.",
          });
        },
      }
    );

  const [
    markNotificationAsUnread,
    { loading: markNotificationAsUnreadLoading },
  ] = useMutation<MarkNotificationAsUnreadData, MarkNotificationAUnreadArgs>(
    MARK_NOTIFICATION_AS_UNREAD,
    {
      onCompleted: () => {
        refetchUserNotifications();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description:
            "Failed to mark notification as unread. Please try again.",
        });
      },
    }
  );

  const markSingleNotification = (notificationId: string) => {
    const notificationIndex = notifications.findIndex(
      (not) => not.id === notificationId
    );
    const notification = notifications.find((not) => not.id === notificationId);
    setCurrentNotificationIndex(notificationIndex);

    if (notification?.unread) {
      markNotificationAsRead({ variables: { input: { id: notificationId } } });
    } else {
      markNotificationAsUnread({
        variables: { input: { id: notificationId } },
      });
    }
  };

  const deleteSingleNotification = (notificationId: string) => {
    const notificationIndex = notifications.findIndex(
      (not) => not.id === notificationId
    );
    setCurrentNotificationIndex(notificationIndex);
    deleteNotification({ variables: { input: { id: notificationId } } });
  };
  return (
    <div key={notification.id}>
      {markNotificationAsReadLoading ||
      markNotificationAsUnreadLoading ||
      (deleteNotificationLoading && currentNotificationIndex === index) ? (
        <div className="h-32 flex justify-center items-center">
          <CircleNotch
            size={40}
            className="text-ch-dark dark:text-ch-light animate-spin"
          />
        </div>
      ) : (
        <>
          <Separator />
          <div className="px-5 py-2">
            <div className="flex justify-between items-center">
              <span className="font-bold">{notification.title}</span>
              <NotificationOptionsMenu
                deleteSingleNotification={deleteSingleNotification}
                markSingleNotification={markSingleNotification}
                notification={notification}
              />
            </div>
            <span className="text-left text-sm pb-3">{notification.body}</span>
            <div className="flex justify-between itemspcenter text-xs mt-5 mb-3">
              {notification.unread ? (
                <span className="py-1 px-2 bg-red-200 text-red-600 font-semibold rounded-full">
                  unread
                </span>
              ) : (
                <span className="py-1 px-2 bg-green-200 text-green-600 font-semibold rounded-full">
                  read
                </span>
              )}
              <span>
                {
                  new Date(+notification.created_at)
                    .toLocaleString("en-AU")
                    .split(",")[0]
                }
              </span>
            </div>
          </div>
          <Separator />
        </>
      )}
    </div>
  );
};
