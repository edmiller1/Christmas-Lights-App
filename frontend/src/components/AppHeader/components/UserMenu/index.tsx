import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "..";
import { Get_User } from "@/graphql/queries/getUser/types";
import { KindeUser } from "@/lib/types";

interface Props {
  logUserOut: () => void;
  currentUser: Get_User | null;
  user: KindeUser | undefined;
}

export const UserMenu = ({ logUserOut, currentUser, user }: Props) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 mt-1 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={currentUser?.image ?? user?.picture ?? ""}
              alt={currentUser?.image ?? user?.picture ?? ""}
            />
            <AvatarFallback>
              {currentUser?.name?.[0] ?? user?.given_name?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={currentUser?.image ?? user?.picture ?? ""}
              ></AvatarImage>
              <AvatarFallback>
                {currentUser?.name?.[0] ?? user?.given_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser?.name ?? user?.given_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser?.email ?? user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/route-planning")}
          >
            Route Planning
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile/decorations")}
          >
            Decorations
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile/history")}
          >
            History
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile/favourites")}
          >
            Favourites
          </DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logUserOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
