import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical } from "@phosphor-icons/react";

interface Props {
  setIsEditOpen: (isEditOpen: boolean) => void;
}

export const DecorationUserMenu = ({ setIsEditOpen }: Props) => {
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setIsEditOpen(true)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
