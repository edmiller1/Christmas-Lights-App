import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell } from "@phosphor-icons/react";

export const NotificationButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" className="relative">
          <Bell
            size={20}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
          <div className="absolute top-1 right-2 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
            3
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute -right-2 top-2 p-0 w-80">
        <div className="flex justify-between items-center px-4">
          <span className="py-2 text-lg font-semibold">Notifications</span>
        </div>
        <Separator />
        <div className="py-1"></div>
      </PopoverContent>
    </Popover>
  );
};
