import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical } from "@phosphor-icons/react";

export const DecorationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full focus:outline-none"
        >
          <DotsThreeVertical
            size={28}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-24">
        <DropdownMenuItem>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
