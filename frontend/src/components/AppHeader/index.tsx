import { Link, useNavigate } from "react-router-dom";
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
  CreateDecorationModal,
  LoggedOutUserMenu,
  NotificationButton,
  UserMenu,
} from "./components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useToast } from "../ui/use-toast";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useState } from "react";
import {
  GET_UNREAD_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS,
} from "@/graphql/queries";
import { GetUserNotifications as GetUserNotificationsData } from "@/graphql/queries/getUserNotifications/types";
import { useQuery } from "@apollo/client";

interface Props {
  isAuthenticated: boolean;
  currentUser: Get_User | null;
  searchQuery?: string | null;
}

export const AppHeader = ({
  isAuthenticated,
  currentUser,
  searchQuery,
}: Props) => {
  const { toast } = useToast();
  const { logout } = useKindeAuth();
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchViaKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const searchViaClick = () => {
    navigate(`/search?query=${searchTerm}`);
  };

  const { data: getUserNotificationsData, refetch: refetchUserNotifications } =
    useQuery<GetUserNotificationsData>(GET_USER_NOTIFICATIONS, {
      variables: { input: { userId: currentUser?.id } },
    });

  const {
    data: getUnreadNotificationsData,
    refetch: refetchUnreadNotifications,
  } = useQuery(GET_UNREAD_NOTIFICATIONS);

  const userNotifications = getUserNotificationsData
    ? getUserNotificationsData.getUserNotifications
    : null;

  const unreadNotificationsCount = getUnreadNotificationsData
    ? getUnreadNotificationsData.getUnreadNotifications
    : null;

  const refetchNotifications = () => {
    refetchUserNotifications();
  };

  const refetchUnreadNotificationsCount = () => {
    refetchUnreadNotifications();
  };

  const logUserOut = async () => {
    await logout();
    sessionStorage.removeItem("token");
    toast({
      title: "Signed out successfully!",
    });
  };

  return (
    <>
      <CreateDecorationModal
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
      <div className="z-50 w-full flex-col sm:border-b dark:border-none md:flex">
        <div
          className={`${
            window.location.pathname.includes("notification") ||
            window.location.pathname.includes("profile")
              ? "hidden sm:block"
              : "shadow-md border-b"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-10">
            <Link to="/home" className="hidden sm:block">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
            <div className="flex w-full max-w-sm items-center justify-center space-x-2">
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery ? searchQuery : searchTerm}
                onChange={(e) => handleSearch(e)}
                onKeyDown={(e) => searchViaKey(e)}
              />
              <Button
                variant="outline"
                size="icon"
                type="submit"
                disabled={!searchTerm}
                onClick={searchViaClick}
              >
                <MagnifyingGlass
                  size={16}
                  weight="bold"
                  className="text-ch-dark dark:text-ch-light"
                />
              </Button>
            </div>
            <div className="hidden sm:flex mx-6 items-center space-x-4">
              {isAuthenticated ? (
                <CreateButton setIsCreateOpen={setIsCreateOpen} />
              ) : null}
              {/* Notification Button */}
              {isAuthenticated ? (
                <NotificationButton
                  refetchNotifications={refetchNotifications}
                  refetchUnreadNotificationsCount={
                    refetchUnreadNotificationsCount
                  }
                  unreadNotificationsCount={unreadNotificationsCount}
                  userNotifications={userNotifications}
                />
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
        <nav className="bg-background fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 z-[99] flex items-center border-t sm:hidden">
          <div className="flex flex-auto items-start justify-center">
            <Link
              to="/"
              type="button"
              className={`${
                location.pathname === "/"
                  ? "flex flex-col flex-1 items-center p-4 text-center text-primary"
                  : "flex flex-col flex-1 items-center p-4 text-center"
              }`}
            >
              <House
                size={24}
                className={`${
                  location.pathname === "/"
                    ? "text-primary"
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
                    ? "flex flex-col flex-1 items-center p-4 text-center text-primary"
                    : "flex flex-col flex-1 items-center p-4 text-center"
                }`}
              >
                <Path
                  size={24}
                  className={`${
                    location.pathname === "/route-planning"
                      ? "text-primary"
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
                    ? "relative flex flex-col flex-1 items-center p-4 text-center text-primary"
                    : "relative flex flex-col flex-1 items-center p-4 text-center"
                }`}
              >
                <Bell
                  size={24}
                  className={`${
                    location.pathname === "/notifications"
                      ? "text-primary"
                      : "text-ch-dark dark:text-ch-light"
                  }`}
                />
                <span className="text-xs mt-1">Inbox</span>
                {unreadNotificationsCount > 0 ? (
                  <div className="absolute top-2 right-6 w-4 h-4 bg-red-600 rounded-full text-xs text-white">
                    {unreadNotificationsCount}
                  </div>
                ) : null}
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
                    ? "relative flex flex-col flex-1 items-center p-4 text-center text-primary"
                    : "relative flex flex-col flex-1 items-center p-4 text-center"
                }`}
              >
                <UserCircle
                  size={24}
                  className={`${
                    location.pathname.includes("/profile")
                      ? "text-primary"
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
