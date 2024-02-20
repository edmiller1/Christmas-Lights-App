import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Get_User } from "@/graphql/queries/getUser/types";
import {
  Bell,
  ClockCounterClockwise,
  Heart,
  House,
  HouseLine,
  UserCircle,
} from "@phosphor-icons/react";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  user: Get_User | null;
}

export const UserMenu = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <DrawerContent className="dark:text-ch-light">
      <div className="px-8 py-5">
        <div className="flex items-center justify-start space-x-3">
          <Avatar className="">
            <AvatarImage src={user?.image} alt="Profile Picture" />
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">{user?.name}</span>
            <span className="dark:text-zinc-400">{user?.email}</span>
          </div>
        </div>
        <div className="mt-5 rounded-xl w-full dark:bg-zinc-800">
          <div
            role="button"
            className="flex items-center space-x-2 p-3"
            onClick={() => navigate("/")}
          >
            <House size={28} weight="fill" className="dark:text-ch-light" />
            <span className="text-xl">Home</span>
          </div>
          <Separator />
          <div
            role="button"
            className="flex items-center space-x-2 p-3"
            onClick={() => navigate("/profile")}
          >
            <UserCircle
              size={28}
              weight="fill"
              className="dark:text-ch-light"
            />
            <span className="text-xl">Profile</span>
          </div>
          <Separator />
          <div
            role="button"
            className="flex items-center space-x-3 p-3"
            onClick={() => navigate("/notifications")}
          >
            <Bell size={28} weight="fill" className="dark:text-ch-light" />
            <span className="text-xl">Notifications</span>
          </div>
          <Separator />
          <div
            role="button"
            className="flex items-center space-x-3 p-3"
            onClick={() => navigate("/profile/decorations")}
          >
            <HouseLine size={28} weight="fill" className="dark:text-ch-light" />
            <span className="text-xl">Decorations</span>
          </div>
          <Separator />
          <div
            role="button"
            className="flex items-center space-x-3 p-3"
            onClick={() => navigate("/profile/history")}
          >
            <ClockCounterClockwise
              size={28}
              weight="fill"
              className="dark:text-ch-light"
            />
            <span className="text-xl">History</span>
          </div>
          <Separator />
          <div
            role="button"
            className="flex items-center space-x-3 p-3"
            onClick={() => navigate("/profile/favourites")}
          >
            <Heart size={28} weight="fill" className="dark:text-ch-light" />
            <span className="text-xl">Favourites</span>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
};
