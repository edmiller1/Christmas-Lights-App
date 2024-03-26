import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";
import { ThemeToggle } from "..";

export const LoggedOutUserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircle
          size={40}
          weight="thin"
          className="cursor-pointer text-ch-dark dark:text-ch-light"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-56" align="end" forceMount>
        <Link to="/signin">
          <DropdownMenuItem className="my-1 cursor-pointer">
            Log in
          </DropdownMenuItem>
        </Link>
        <Link to="/signup">
          <DropdownMenuItem className="my-1 cursor-pointer">
            Sign up
          </DropdownMenuItem>
        </Link>
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
