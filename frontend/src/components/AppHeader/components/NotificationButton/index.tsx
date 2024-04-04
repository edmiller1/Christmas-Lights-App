import { useMutation } from "@apollo/client";
import {
  DELETE_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from "@/graphql/mutations";
import { DeleteAllNotifications as DeleteAllNotificationsData } from "@/graphql/mutations/deleteAllNotifications/types";
import { MarkAllNotificationsAsRead as MarkAllNotificationsAsReadData } from "@/graphql/mutations/markAllNotificationsAsRead/types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell, CircleNotch, Notification } from "@phosphor-icons/react";
import { AllNotificationsMenu, NotificationItem } from "..";
import { useToast } from "@/components/ui/use-toast";
import { Get_User_Notifications } from "@/graphql/queries/getUserNotifications/types";

interface Props {
  refetchNotifications: () => void;
  refetchUnreadNotificationsCount: () => void;
  unreadNotificationsCount: any;
  userNotifications: Get_User_Notifications[] | null;
}

export const NotificationButton = ({
  refetchNotifications,
  refetchUnreadNotificationsCount,
  unreadNotificationsCount,
  userNotifications,
}: Props) => {
  const { toast } = useToast();

  const [deleteAllNotifications, { loading: deleteAllNotificationsLoading }] =
    useMutation<DeleteAllNotificationsData>(DELETE_ALL_NOTIFICATIONS, {
      onCompleted: () => {
        refetchNotifications();
      },
    });

  const [
    markAllNotificationsAsRead,
    { loading: markAllNotificationsAsReadLoading },
  ] = useMutation<MarkAllNotificationsAsReadData>(
    MARK_ALL_NOTIFICATIONS_AS_READ,
    {
      onCompleted: () => {
        refetchNotifications();
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

  const markAllNotifications = () => {
    markAllNotificationsAsRead();
  };

  const deleteAllTheNotifications = () => {
    deleteAllNotifications();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" className="relative">
          <Bell
            size={20}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
          {unreadNotificationsCount > 0 ? (
            <div className="absolute top-1 right-2 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
              {unreadNotificationsCount}
            </div>
          ) : null}
        </Button>
      </PopoverTrigger>
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
                      refetchUserNotifications={refetchNotifications}
                      refetchUnreadNotifications={
                        refetchUnreadNotificationsCount
                      }
                    />
                  ))}
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
    </Popover>
  );
};
