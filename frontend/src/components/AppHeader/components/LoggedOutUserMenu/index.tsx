import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "@phosphor-icons/react";
import { ThemeToggle } from "..";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const LoggedOutUserMenu = () => {
  const { login, register } = useKindeAuth();
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
        <DropdownMenuItem
          className="my-1 cursor-pointer"
          onClick={() => login()}
        >
          Log in
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-1 cursor-pointer"
          onClick={() => register()}
        >
          Sign up
        </DropdownMenuItem>
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
