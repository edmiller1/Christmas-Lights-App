import { useMutation } from "@apollo/client";
import {
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_UNREAD,
} from "@/graphql/mutations";
import { DeleteAllNotifications as DeleteAllNotificationsData } from "@/graphql/mutations/deleteAllNotifications/types";
import {
  DeleteNotification as DeleteNotificationData,
  DeleteNotificationArgs,
} from "@/graphql/mutations/deleteNotification/types";
import { MarkAllNotificationsAsRead as MarkAllNotificationsAsReadData } from "@/graphql/mutations/markAllNotificationsAsRead/types";
import {
  MarkNotificationAsRead as MarkNotificationAsReadData,
  MarkNotificationAsReadArgs,
} from "@/graphql/mutations/markNotificationAsRead/types";
import {
  MarkNotificationAsUnread as MarkNotificationAsUnreadData,
  MarkNotificationAUnreadArgs,
} from "@/graphql/mutations/markNotificationAsUnread/types";
import { Get_User_Notifications } from "@/graphql/queries/getUserNotifications/types";
import { CircleNotch, Notification } from "@phosphor-icons/react";
import {
  AllNotificationsMenu,
  NotificationItem,
  NotificationOptionsMenu,
} from "./components";
import { toast } from "@/components/ui/use-toast";
import { PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface Props {
  userNotifications: Get_User_Notifications[] | null;
  refetchUserNotifications: () => void;
}

export const NotificationsMenu = ({
  userNotifications,
  refetchUserNotifications,
}: Props) => {
  const [deleteAllNotifications, { loading: deleteAllNotificationsLoading }] =
    useMutation<DeleteAllNotificationsData>(DELETE_ALL_NOTIFICATIONS, {
      onCompleted: () => {
        refetchUserNotifications();
      },
    });

  const [deleteNotification, { loading: deleteNotificationLoading }] =
    useMutation<DeleteNotificationData, DeleteNotificationArgs>(
      DELETE_NOTIFICATION,
      {
        onCompleted: () => {
          refetchUserNotifications();
        },
      }
    );

  const [
    markAllNotificationsAsRead,
    { loading: markAllNotificationsAsReadLoading },
  ] = useMutation<MarkAllNotificationsAsReadData>(
    MARK_ALL_NOTIFICATIONS_AS_READ,
    {
      onCompleted: () => {
        refetchUserNotifications();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: `Failed to mark all notifications as read. ${error}`,
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
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description: `Failed to mark notification as read. ${error}`,
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
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: `Failed to mark notification as unread. ${error}`,
        });
      },
    }
  );

  //FUNCTIONS
  const markSingleNotification = (notificationId: string) => {
    const notification = userNotifications?.find(
      (not) => not.id === notificationId
    );

    if (notification?.unread) {
      markNotificationAsRead({ variables: { input: { id: notificationId } } });
    } else {
      markNotificationAsUnread({
        variables: { input: { id: notificationId } },
      });
    }
  };

  const markAllNotifications = () => {
    markAllNotificationsAsRead();
  };

  const deleteSingleNotification = (notificationId: string) => {
    deleteNotification({ variables: { input: { id: notificationId } } });
  };

  const deleteAllTheNotifications = () => {
    deleteAllNotifications();
  };

  return (
    <PopoverContent className="absolute -right-2 top-2 p-0 w-80">
      <div className="flex justify-between items-center px-4">
        <span className="py-2 text-lg font-semibold">Notifications</span>
        {userNotifications && userNotifications.length > 0 ? (
          <AllNotificationsMenu
            markAllNotifications={markAllNotifications}
            deleteAllTheNotifications={deleteAllTheNotifications}
          />
        ) : null}
      </div>
      <Separator />
      <div className="p-1">
        {userNotifications && userNotifications.length > 0 ? (
          <>
            {markAllNotificationsAsReadLoading ||
            deleteAllNotificationsLoading ? (
              <div className="h-52 flex justify-center items-center">
                <CircleNotch
                  size={80}
                  className="text-ch-dark dark:text-ch-light animate-spin"
                />
              </div>
            ) : (
              <>
                {userNotifications.map((notification, index) => (
                  <NotificationItem
                    key={notification.id}
                    index={index}
                    notification={notification}
                    notifications={userNotifications}
                    refetchUserNotifications={refetchUserNotifications}
                  />
                ))}
                <Separator />
              </>
            )}
          </>
        ) : (
          <div className="h-72 flex flex-col justify-center items-center">
            <Notification
              size={40}
              className="text-ch-dark dark:text-ch-light"
            />
            <span className="mt-2">No notifications</span>
          </div>
        )}
      </div>
    </PopoverContent>
  );
};
