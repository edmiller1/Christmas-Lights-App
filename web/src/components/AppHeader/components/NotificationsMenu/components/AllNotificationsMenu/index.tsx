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
      <DropdownMenuTrigger className="relative flex-shrink-0 rounded-full p-1 hover:bg-gray-500 dark:hover:bg-zinc-800 focus:outline-none">
        <DotsThree
          size={28}
          weight="bold"
          className="text-ch-dark dark:text-ch-light"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-3 -top-1 w-48">
        <DropdownMenuItem>
          <button className="flex items-center" onClick={markAllNotifications}>
            <CheckSquare size={20} weight="bold" className="text-green-500" />
            <span className="ml-2 text-sm">Mark all as read</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center"
            onClick={deleteAllTheNotifications}
          >
            <XSquare size={20} weight="bold" className="text-red-500" />
            <span className="ml-2">Clear all notifications</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
