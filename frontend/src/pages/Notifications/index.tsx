import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_USER_NOTIFICATIONS } from "@/graphql/queries";
import {
  DELETE_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from "@/graphql/mutations";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "@/graphql/queries/getUser/types";
import { GetUserNotifications as GetUserNotificationsData } from "@/graphql/queries/getUserNotifications/types";
import { DeleteAllNotifications as DeleteAllNotificationsData } from "@/graphql/mutations/deleteAllNotifications/types";
import { MarkAllNotificationsAsRead as MarkAllNotificationsAsReadData } from "@/graphql/mutations/markAllNotificationsAsRead/types";
import { NotFound } from "..";
import { CircleNotch, Notification } from "@phosphor-icons/react";
import { NotificationItem, NotificationsLoading } from "./components";
import { useToast } from "@/components/ui/use-toast";
import {
  AllNotificationsMenu,
  AppHeaderLoading,
} from "@/components/AppHeader/components";
import { AppHeader } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";

export const Notifications = () => {
  const { toast } = useToast();
  const { getToken, isAuthenticated, user } = useKindeAuth();

  const [deleteAllNotifications, { loading: deleteAllNotificationsLoading }] =
    useMutation<DeleteAllNotificationsData>(DELETE_ALL_NOTIFICATIONS, {
      onCompleted: () => {
        refetchUserNotifications();
      },
    });

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

  const { data: getUserData, loading: getUserLoading } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: user?.id ? user.id : "" } },
  });

  const currentUser = getUserData?.getUser ? getUserData.getUser : null;

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

  const markAllNotifications = () => {
    markAllNotificationsAsRead();
  };

  const deleteAllTheNotifications = () => {
    deleteAllNotifications();
  };

  const hasSession = async () => {
    const token = await getToken();
    if (!token) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    hasSession();
  }, [getToken]);

  if (getUserNotificationsLoading || getUserLoading) {
    return <NotificationsLoading />;
  }

  return (
    <>
      <div className="hidden sm:block">
        <NotFound />
      </div>
      <div className="py-5 min-h-screen sm:hidden">
        {getUserLoading ? (
          <AppHeaderLoading />
        ) : (
          <AppHeader
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
        )}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center mt-5">
            <h1 className="ml-5 font-bold text-3xl">Notifications</h1>
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
                  {userNotifications?.map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      index={index}
                      notification={notification}
                      notifications={userNotifications}
                      refetchUserNotifications={refetchUserNotifications}
                    />
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
