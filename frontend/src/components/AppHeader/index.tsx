import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Bell,
  House,
  MagnifyingGlass,
  Path,
  PlusSquare,
  UserCircle,
} from "@phosphor-icons/react";
import {
  CreateButton,
  LoggedOutUserMenu,
  NotificationButton,
  UserMenu,
} from "./components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useToast } from "../ui/use-toast";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  isAuthenticated: boolean;
  currentUser: Get_User | undefined;
}

export const AppHeader = ({ isAuthenticated, currentUser }: Props) => {
  const { toast } = useToast();
  const { logout } = useKindeAuth();

  const logUserOut = async () => {
    await logout();
    sessionStorage.removeItem("token");
    toast({
      title: "Signed out successfully!",
    });
  };

  return (
    <>
      <div className="z-50 w-full flex-col border-b dark:border-none md:flex">
        <div
          className={`${
            window.location.pathname.includes("notification") ||
            window.location.pathname.includes("profile")
              ? "hidden sm:block"
              : "shadow-md border-b"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-10">
            <Link to="/" className="hidden sm:block">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
            <div className="flex w-full max-w-sm items-center justify-center space-x-2">
              <Input type="text" placeholder="Search" value="" />
              <Button variant="outline" size="icon" type="submit">
                <MagnifyingGlass
                  size={16}
                  weight="bold"
                  className="text-ch-dark dark:text-ch-light"
                />
              </Button>
            </div>
            <div className="hidden sm:flex mx-6 items-center space-x-4">
              {isAuthenticated ? <CreateButton /> : null}
              {/* Notification Button */}
              {isAuthenticated ? (
                <NotificationButton currentUser={currentUser} />
              ) : null}
              {isAuthenticated && currentUser ? (
                <UserMenu currentUser={currentUser} logUserOut={logUserOut} />
              ) : (
                <LoggedOutUserMenu />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile bottom menu */}
      {!location.pathname.includes("search") ? (
        <nav className="fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 z-50 flex items-center border-t sm:hidden">
          <div className="flex flex-auto items-start justify-center">
            <Link
              to="/"
              type="button"
              className={`${
                location.pathname === "/"
                  ? "flex flex-col flex-1 items-center p-4 text-center text-ch-red"
                  : "flex flex-col flex-1 items-center p-4 text-center"
              }`}
            >
              <House
                size={24}
                className={`${
                  location.pathname === "/"
                    ? "text-ch-red"
                    : "text-ch-dark dark:text-ch-light"
                }`}
              />
              <span className="text-xs mt-1">Home</span>
            </Link>

            {isAuthenticated ? (
              <Link
                to="/route-planning"
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
            ) : (
              <Link
                to="/signin"
                type="button"
                className="flex flex-col flex-1 items-center p-4 text-center"
              >
                <Path size={24} className="text-ch-dark dark:text-ch-light" />
                <span className="text-xs mt-1">Route</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div
                role="button"
                className="flex flex-col flex-1 items-center p-4 text-center"
                // onClick={() => setIsCreateOpen(true)}
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

            {!isAuthenticated ? (
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
                {/* {userNotifications?.filter((not) => not.unread).length ===
                0 ? null : (
                  <div className="absolute top-2 right-7 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
                    {userNotifications?.filter((not) => not.unread).length}
                  </div>
                )} */}
              </Link>
            )}

            {!isAuthenticated ? (
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
      ) : null}
    </>
  );
};
