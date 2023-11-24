import { UserCircle } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ThemeToggle } from "..";

export const LoggedOutMenuItems = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircle
          size={40}
          color="#ffffff"
          weight="thin"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-56" align="end" forceMount>
        <ThemeToggle />
        <Link to="/signin">
          <DropdownMenuItem>Log in/Sign up</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
