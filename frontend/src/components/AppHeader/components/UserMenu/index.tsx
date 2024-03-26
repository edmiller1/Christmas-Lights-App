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

export const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">User name</p>
              <p className="text-muted-foreground text-xs leading-none">
                email
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
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
