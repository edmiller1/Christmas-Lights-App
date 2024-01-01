import { useQuery } from "@apollo/client";
import { GET_USER_NOTIFICATIONS } from "@/graphql/queries/";
import { GetUserNotifications as GetUserNotificationsData } from "@/graphql/queries/getUserNotifications/types";
import {
  Bell,
  House,
  HouseLine,
  MagnifyingGlass,
  Path,
  PlusSquare,
  UserCircle,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Link, redirect, useLocation } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";
import {
  CreateDecorationModal,
  LoggedOutMenuItems,
  MenuItems,
  NotificationsMenu,
} from "./components";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { auth } from "@/lib/firebase";

interface Props {
  user: Get_User | null;
}

export const AppHeader = ({ user }: Props) => {
  const location = useLocation();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const {
    data: getUserNotificationsData,
    loading: getUserNotificationsLoading,
    refetch: getUserNotificationsRefetch,
  } = useQuery<GetUserNotificationsData>(GET_USER_NOTIFICATIONS);

  const refetchUserNotifications = () => {
    getUserNotificationsRefetch();
  };

  const signOut = async () => {
    await auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
        redirect("/home");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: "Failed to sign out. Please try again.",
        });
      });
  };

  const userNotifications = getUserNotificationsData?.getUserNotifications
    ? getUserNotificationsData.getUserNotifications
    : null;

  return (
    <>
      <CreateDecorationModal
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        user={user}
      />

      <div className="fixed z-50 w-full bg-white flex-col border-b dark:border-none md:flex dark:bg-zinc-900">
        <div
          className={`${
            window.location.pathname.includes("notification") ||
            window.location.pathname.includes("profile")
              ? "hidden sm:block"
              : "shadow-md dark:border-b dark:border-b-black"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-10">
            <Link to="/home" className="hidden sm:block">
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
            <div className="hidden sm:flex mx-6 items-center space-x-4">
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
                  {/* Notifications */}
                  <Popover>
                    <PopoverTrigger>
                      <div className="relative flex-shrink-0 mr-2 rounded-full p-2 hover:bg-gray-500 dark:hover:bg-zinc-800 focus:outline-none">
                        <Bell
                          size={20}
                          weight="bold"
                          className="text-ch-dark dark:text-ch-light"
                        />
                        {userNotifications?.filter((not) => not.unread)
                          .length === 0 ? null : (
                          <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
                            {
                              userNotifications?.filter((not) => not.unread)
                                .length
                            }
                          </div>
                        )}
                      </div>
                    </PopoverTrigger>
                    <NotificationsMenu
                      userNotifications={userNotifications}
                      refetchUserNotifications={refetchUserNotifications}
                    />
                  </Popover>
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
      <nav className="fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 z-10 flex items-center bg-slate-50 dark:bg-zinc-900 border-t dark:border-black sm:hidden">
        <div className="flex flex-auto items-start justify-center">
          <Link
            to="/home"
            type="button"
            className={`${
              location.pathname === "/home"
                ? "flex flex-col flex-1 items-center p-4 text-center text-ch-red"
                : "flex flex-col flex-1 items-center p-4 text-center"
            }`}
          >
            <House
              size={24}
              className={`${
                location.pathname === "/home"
                  ? "text-ch-red"
                  : "text-ch-dark dark:text-ch-light"
              }`}
            />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/profile/route-planning"
            type="button"
            className={`${
              location.pathname === "/route-planning"
                ? "flex flex-col flex-1 items-center p-4 text-center text-ch-red"
                : "flex flex-col flex-1 items-center p-4 text-center"
            }`}
          >
            <Path
              size={24}
              className={`${
                location.pathname === "/route-planning"
                  ? "text-ch-red"
                  : "text-ch-dark dark:text-ch-light"
              }`}
            />
            <span className="text-xs mt-1">Route</span>
          </Link>

          {user ? (
            <div
              role="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
              onClick={() => setIsCreateOpen(true)}
            >
              <PlusSquare
                size={24}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="text-xs mt-1">Create</span>
            </div>
          ) : (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <PlusSquare
                size={24}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="text-xs mt-1">Create</span>
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <Bell size={24} className="text-ch-dark dark:text-ch-light" />
              <span className="text-xs mt-1">Inbox</span>
            </Link>
          ) : (
            <Link
              to="/notifications"
              type="button"
              className={`${
                location.pathname === "/notifications"
                  ? "relative flex flex-col flex-1 items-center p-4 text-center text-ch-red"
                  : "relative flex flex-col flex-1 items-center p-4 text-center"
              }`}
            >
              <Bell
                size={24}
                className={`${
                  location.pathname === "/notifications"
                    ? "text-ch-red"
                    : "text-ch-dark dark:text-ch-light"
                }`}
              />
              <span className="text-xs mt-1">Inbox</span>
              {userNotifications?.filter((not) => not.unread).length ===
              0 ? null : (
                <div className="absolute top-2 right-7 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
                  {userNotifications?.filter((not) => not.unread).length}
                </div>
              )}
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              type="button"
              className="flex flex-col flex-1 items-center p-4 text-center"
            >
              <UserCircle
                size={24}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <Link
              to="/profile"
              type="button"
              className={`${
                location.pathname.includes("/profile")
                  ? "relative flex flex-col flex-1 items-center p-4 text-center text-ch-red"
                  : "relative flex flex-col flex-1 items-center p-4 text-center"
              }`}
            >
              <UserCircle
                size={24}
                className={`${
                  location.pathname.includes("/profile")
                    ? "text-ch-red"
                    : "text-ch-dark dark:text-ch-light"
                }`}
              />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};
