import {
  Bell,
  Heart,
  House,
  HouseLine,
  MagnifyingGlass,
  PlusSquare,
  UserCircle,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, redirect } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";
import {
  CreateDecorationModal,
  LoggedOutMenuItems,
  MenuItems,
  ThemeToggle,
} from "./components";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "../ui/use-toast";

interface Props {
  user: Get_User | null;
}

export const AppHeader = ({ user }: Props) => {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const signOut = async () => {
    await supabase.auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
        redirect("/");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: `${error}`,
        });
      });
  };

  return (
    <>
      <CreateDecorationModal
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        user={user}
      />
      <div className="flex-col md:flex dark:bg-zinc-900">
        <div className="shadow-md dark:border-b dark:border-b-black">
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/" className="hidden sm:block">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
            <div className="flex w-full max-w-sm items-center justify-center space-x-2">
              <Input type="text" placeholder="Search" />
              <Button variant="outline" size="icon" type="submit">
                <MagnifyingGlass
                  size={16}
                  weight="bold"
                  className="text-ch-dark dark:text-ch-light"
                />
              </Button>
            </div>
            <div className="hidden sm:flex mx-6  items-center space-x-4">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => setIsCreateOpen(true)}
                  >
                    <HouseLine
                      size={20}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                    <span className="ml-1">Create</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell
                      size={20}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                  </Button>
                </>
              ) : null}
              {user ? (
                <MenuItems user={user} signOut={signOut} />
              ) : (
                <LoggedOutMenuItems />
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 z-10 flex items-center dark:bg-zinc-900 dark:border-t dark:border-black sm:hidden">
        <div className="flex flex-auto items-start justify-center">
          <Link
            to="/"
            type="button"
            className="flex flex-col flex-1 items-center p-4 text-center"
          >
            <House size={24} color="#ffffff" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          {!user ? (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <Heart size={24} color="#ffffff" />
              <span className="text-xs mt-1">Favourites</span>
            </Link>
          ) : (
            <Link
              to="/"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <Heart size={24} color="#ffffff" />
              <span className="text-xs mt-1">Favourites</span>
            </Link>
          )}

          {user ? (
            <div
              role="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
              onClick={() => setIsCreateOpen(true)}
            >
              <PlusSquare size={24} color="#ffffff" />
              <span className="text-xs mt-1">Create</span>
            </div>
          ) : (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <PlusSquare size={24} color="#ffffff" />
              <span className="text-xs mt-1">Create</span>
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <Bell size={24} color="#ffffff" />
              <span className="text-xs mt-1">Inbox</span>
            </Link>
          ) : (
            <Link
              to="/"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <Bell size={24} color="#ffffff" />
              <span className="text-xs mt-1">Inbox</span>
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <UserCircle size={24} color="#ffffff" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <Link
              to="/"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <UserCircle size={24} color="#ffffff" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};
