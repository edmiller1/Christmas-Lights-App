import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Get_User_Notifications } from "@/graphql/queries/getUserNotifications/types";
import {
  CheckCircle,
  DotsThreeVertical,
  MinusCircle,
  XCircle,
} from "@phosphor-icons/react";

interface Props {
  notification: Get_User_Notifications;
  markSingleNotification: (notificationId: string) => void;
  deleteSingleNotification: (notificationId: string) => void;
}

export const NotificationOptionsMenu = ({
  markSingleNotification,
  notification,
  deleteSingleNotification,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <DotsThreeVertical
            size={32}
            weight="bold"
            className="p-1 text-ch-dark dark:text-ch-light hover:bg-gray-300 dark:hover:bg-zinc-700 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-3 -top-1 w-48">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => markSingleNotification(notification.id)}
        >
          {notification.unread ? (
            <CheckCircle size={16} weight="bold" className="text-green-500" />
          ) : (
            <MinusCircle size={16} weight="bold" className="text-red-500" />
          )}

          <span className="ml-2">
            {notification.unread ? "Mark as read" : "Mark as unread"}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => deleteSingleNotification(notification.id)}
        >
          <XCircle size={16} weight="bold" className="text-red-500" />
          <span className="ml-2">Remove notification</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
