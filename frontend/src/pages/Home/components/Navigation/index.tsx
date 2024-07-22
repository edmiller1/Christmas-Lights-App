import { KindeUser } from "@/lib/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  CreateButton,
  CreateDecorationModal,
  ThemeToggle,
} from "@/components/AppHeader/components";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  currentPlace: string;
  isAuthenticated: boolean;
  user: KindeUser | undefined;
  logout: () => Promise<void>;
  login: (options?: any) => Promise<void>;
  currentUser: Get_User | null;
}

export const Navigation = ({
  currentUser,
  currentPlace,
  isAuthenticated,
  user,
  logout,
  login,
}: Props) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Christmas Lights App</span>
            <img className="w-auto h-10" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <List className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 hover:underline"
          >
            Home
          </Link>
          {localStorage.getItem("latitude") &&
          localStorage.getItem("longitude") ? (
            <Link
              to={`/explore?query=${currentPlace}`}
              className="text-sm font-semibold leading-6 hover:underline"
            >
              Explore
            </Link>
          ) : null}
        </div>
        <div className="hidden lg:flex lg:space-x-5 lg:flex-1 lg:justify-end">
          <Button className="rounded-full">Get the app</Button>
          {isAuthenticated ? (
            <CreateButton setIsCreateOpen={setIsCreateOpen} />
          ) : null}
          {!isAuthenticated ? (
            <Button
              variant="outline"
              className="text-sm font-semibold leading-6"
              onClick={() => login()}
            >
              Log in{" "}
              <span aria-hidden="true" className="mt-0.5 ml-1">
                &rarr;
              </span>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative w-8 h-8 mt-1 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.picture ?? ""}
                      alt={user?.given_name ?? ""}
                    />
                    <AvatarFallback>
                      {user?.given_name?.[0] ?? ""}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.picture ?? ""}></AvatarImage>
                      <AvatarFallback>
                        {user?.given_name?.[0] ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.given_name} {user?.family_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
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
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="-my-6 divide-y divide-gray-500/10">
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
              <div className="py-6">
                <Link
                  to="/app"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                >
                  Get the app
                </Link>
                {!isAuthenticated ? (
                  <Button
                    variant="link"
                    className="text-foreground -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                    onClick={() => login()}
                  >
                    Log in
                  </Button>
                ) : null}
              </div>
              {isAuthenticated ? (
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 space-y-2">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/Notifications"
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
              <div className="w-full py-6">
                <Button className="w-full rounded-full">Get Premium</Button>
              </div>
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
