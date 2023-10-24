import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical } from "@phosphor-icons/react";

export const DecorationUserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <DotsThreeVertical
            size={28}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-24">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
