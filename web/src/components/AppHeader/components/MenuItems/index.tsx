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
import { Get_User } from "@/graphql/queries/getUser/types";
import { ThemeToggle } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  currentUser: Get_User | null;
  signOut: () => void;
}

export const MenuItems = ({ currentUser, signOut }: Props) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser?.image} alt="profile image" />
            <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={currentUser?.image as string}
                alt="profile avatar"
              />
              <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser?.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/route-planning")}>
            Route Planning
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile/decorations")}>
            Decorations
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile/history")}>
            History
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile/favourites")}>
            Favourites
          </DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
