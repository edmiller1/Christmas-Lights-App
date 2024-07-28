import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HouseLine, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import {
  CreateButton,
  CreateDecorationModal,
  LoggedOutUserMenu,
  NotificationButton,
  UserMenu,
} from "./components";
import { useToast } from "../ui/use-toast";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useEffect, useState } from "react";
import {
  GET_UNREAD_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS,
} from "@/graphql/queries";
import { GetUserNotifications as GetUserNotificationsData } from "@/graphql/queries/getUserNotifications/types";
import { useLazyQuery } from "@apollo/client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Separator } from "../ui/separator";

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

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
  const { login, logout } = useKindeAuth();
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currentPlace, setCurrentPlace] = useState<string>("");

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

  const [
    getUserNotifications,
    { data: getUserNotificationsData, refetch: refetchUserNotifications },
  ] = useLazyQuery<GetUserNotificationsData>(GET_USER_NOTIFICATIONS, {
    variables: { input: { userId: currentUser?.id } },
  });

  const [
    getUnreadNotifications,
    { data: getUnreadNotificationsData, refetch: refetchUnreadNotifications },
  ] = useLazyQuery(GET_UNREAD_NOTIFICATIONS);

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
    toast({
      title: "Signed out successfully!",
    });
  };

  const getCoords = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "latitude",
          JSON.stringify(position.coords.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(position.coords.longitude)
        );
      });

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${localStorage.getItem(
          "longitude"
        )},${localStorage.getItem("latitude")}.json?access_token=${mbApiKey}`
      );
      const jsonData = await response.json();
      const place = jsonData.features.find((item: any) =>
        item.id.includes("place")
      );
      setCurrentPlace(place.text);
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserNotifications();
      getUnreadNotifications();
    }
  }, [isAuthenticated]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-16 border-b">
      <nav
        className="flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center space-x-5 lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Christmas Lights App</span>
            <img className="w-auto h-10" src={logo} alt="" />
          </Link>
          {localStorage.getItem("latitude") &&
          localStorage.getItem("longitude") ? (
            <Link
              to={`/explore?query=${currentPlace}`}
              className="hidden text-sm font-semibold leading-6 sm:block hover:underline"
            >
              Explore
            </Link>
          ) : null}
        </div>
        <div className="flex items-center lg:hidden">
          {isSearchOpen ? (
            <>
              <Input
                type="text"
                placeholder="Search"
                className="ml-4 sm:w-96"
                value={searchQuery ? searchQuery : searchTerm}
                onChange={(e) => handleSearch(e)}
                onKeyDown={(e) => searchViaKey(e)}
              />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setIsSearchOpen(false)}
              >
                <span className="sr-only">Close search</span>
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="sr-only">Open search menu</span>
                <MagnifyingGlass className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setIsCreateOpen(true)}
              >
                <span className="sr-only">Open create menu</span>
                <HouseLine className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <List className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="items-center justify-center hidden w-full max-w-sm mr-10 space-x-2 lg:flex">
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
        <div className="hidden lg:flex lg:space-x-5 lg:flex-1 lg:justify-end">
          {!currentUser?.premium ? (
            <Button
              className="rounded-full"
              onClick={() => navigate("/premium")}
            >
              Get Premium
            </Button>
          ) : null}
          {/* <Button className="rounded-full">Get the app</Button> */}
          {/* Create Button */}
          {isAuthenticated ? (
            <CreateButton setIsCreateOpen={setIsCreateOpen} />
          ) : null}
          {/* Notification Button */}
          {isAuthenticated ? (
            <NotificationButton
              refetchNotifications={refetchNotifications}
              refetchUnreadNotificationsCount={refetchUnreadNotificationsCount}
              unreadNotificationsCount={unreadNotificationsCount}
              userNotifications={userNotifications}
            />
          ) : null}
          {!isAuthenticated ? (
            <LoggedOutUserMenu />
          ) : (
            <UserMenu currentUser={currentUser} logUserOut={logUserOut} />
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-background" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Christmas Lights App</span>
              <img className="w-auto h-8" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 ">
              <div className="py-6 space-y-2">
                <Link
                  to="/"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                >
                  Home
                </Link>
                {localStorage.getItem("latitude") &&
                localStorage.getItem("longitude") ? (
                  <Link
                    to={`/explore?query=${currentPlace}`}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                  >
                    Explore
                  </Link>
                ) : null}
              </div>
              {!isAuthenticated ? (
                <>
                  <Separator />
                  <div className="py-3">
                    <Button
                      variant="link"
                      className="text-foreground -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                      onClick={() => login()}
                    >
                      Log in
                    </Button>
                  </div>
                  <Separator />
                </>
              ) : (
                <Separator />
              )}
              {isAuthenticated ? (
                <div className="-mt-2 -mb-6">
                  <div className="py-6 space-y-2">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/notifications"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Notifications
                    </Link>
                    <Link
                      to="/route-planning"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Route Planning
                    </Link>
                    <Link
                      to="/profile/decorations"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Decorations
                    </Link>
                    <Link
                      to="/profile/history"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      History
                    </Link>
                    <Link
                      to="/profile/favourites"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Favourites
                    </Link>
                  </div>
                  <Separator />
                  <div className="w-full py-6">
                    <Button
                      variant="default"
                      className="w-full rounded-full bg-secondary"
                      onClick={() => logout()}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : null}
              {!currentUser?.premium ? (
                <div className="w-full py-6">
                  <Button
                    className="w-full rounded-full"
                    onClick={() => navigate("/premium")}
                  >
                    Get Premium
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <CreateDecorationModal
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        currentUser={currentUser}
      />
    </header>
  );
};
