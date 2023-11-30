import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_NOTIFICATIONS } from "@/graphql/queries";
import {
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_UNREAD,
} from "@/graphql/mutations";
import { GetUserNotifications as GetUserNotificationsData } from "@/graphql/queries/getUserNotifications/types";
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
import { useNavigate } from "react-router-dom";
import { NotFound } from "..";
import { CaretLeft, CircleNotch, Notification } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { NotificationsLoading } from "./components";
import { useToast } from "@/components/ui/use-toast";
import {
  AllNotificationsMenu,
  NotificationOptionsMenu,
} from "@/components/AppHeader/components/NotificationsMenu/components";

export const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const {
    data: getUserNotificationsData,
    loading: getUserNotificationsLoading,
    refetch: getUserNotificationsRefetch,
  } = useQuery<GetUserNotificationsData>(GET_USER_NOTIFICATIONS);

  const userNotifications = getUserNotificationsData?.getUserNotifications
    ? getUserNotificationsData.getUserNotifications
    : null;

  //FUNCTIONS
  const refetchUserNotifications = () => {
    getUserNotificationsRefetch();
  };

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

  if (getUserNotificationsLoading) {
    return <NotificationsLoading />;
  }

  return (
    <>
      <div className="hidden sm:block">
        <NotFound />
      </div>
      <div className="py-5 sm:hidden">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center mt-6">
            <button onClick={() => navigate(-1)}>
              <CaretLeft
                size={32}
                className="text-ch-dark dark:text-ch-light"
              />
            </button>
            <h1 className="ml-4 font-bold text-2xl">Notifications</h1>
          </div>
          {userNotifications && userNotifications.length > 0 ? (
            <AllNotificationsMenu
              deleteAllTheNotifications={deleteAllTheNotifications}
              markAllNotifications={markAllNotifications}
            />
          ) : null}
        </div>
        <div className="mt-5">
          {userNotifications && userNotifications.length > 0 ? (
            <>
              {markAllNotificationsAsReadLoading ||
              deleteAllNotificationsLoading ? (
                <div className="h-[80vh] flex justify-center items-center">
                  <CircleNotch
                    size={80}
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <div className="mt-10">
                  {userNotifications?.map((notification) => (
                    <div key={notification.id}>
                      {markNotificationAsReadLoading ||
                      markNotificationAsUnreadLoading ||
                      deleteNotificationLoading ? (
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
                              <span className="font-bold">
                                {notification.title}
                              </span>
                              <NotificationOptionsMenu
                                deleteSingleNotification={
                                  deleteSingleNotification
                                }
                                markSingleNotification={markSingleNotification}
                                notification={notification}
                              />
                            </div>
                            <span className="text-left text-sm pb-3">
                              {notification.body}
                            </span>
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
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-[80vh] flex flex-col justify-center items-center">
              <Notification
                size={80}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="mt-2 text-xl">No notifications</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
