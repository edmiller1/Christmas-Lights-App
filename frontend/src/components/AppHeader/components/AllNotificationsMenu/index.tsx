import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckSquare, DotsThree, XSquare } from "@phosphor-icons/react";

interface Props {
  markAllNotifications: () => void;
  deleteAllTheNotifications: () => void;
}

export const AllNotificationsMenu = ({
  markAllNotifications,
  deleteAllTheNotifications,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex-shrink-0 rounded-full p-1 focus:outline-none">
        <Button variant="ghost">
          <DotsThree
            size={28}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-3 -top-1 w-48">
        <DropdownMenuItem
          className="my-1 py-1 cursor-pointer"
          onClick={markAllNotifications}
        >
          <CheckSquare size={20} weight="bold" className="text-green-500" />
          <span className="ml-2 text-xs">Mark all as read</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-1 py-1 cursor-pointer"
          onClick={deleteAllTheNotifications}
        >
          <XSquare size={20} weight="bold" className="text-red-500" />
          <span className="ml-2 text-xs">Clear all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
