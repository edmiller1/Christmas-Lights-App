import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { KindeUser } from "@/lib/types";
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
import { ThemeToggle } from "@/components/AppHeader/components";
import { Input } from "@/components/ui/input";

interface Props {
  currentPlace: string;
  isAuthenticated: boolean;
  user: KindeUser | undefined;
  logout: () => Promise<void>;
  login: (options?: any) => Promise<void>;
}

export const Hero = ({
  currentPlace,
  isAuthenticated,
  login,
  logout,
  user,
}: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Christmas Lights App</span>
              <img className="h-10 w-auto" src={logo} alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <List className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm font-semibold leading-6 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/explore"
              search={{ currentPlace }}
              className="text-sm font-semibold leading-6 hover:underline"
            >
              Explore
            </Link>
          </div>
          <div className="hidden lg:flex lg:space-x-5 lg:flex-1 lg:justify-end">
            <Button className="rounded-full">Get the app</Button>
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
                    className="relative h-8 w-8 rounded-full"
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
                <DropdownMenuContent
                  className="mt-2 w-60"
                  align="end"
                  forceMount
                >
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
                          {user?.given_name}
                        </p>
                        <p className="text-muted-foreground text-xs leading-none">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      //onClick={() => navigate("/profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      //onClick={() => navigate("/route-planning")}
                    >
                      Route Planning
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      //onClick={() => navigate("/profile/decorations")}
                    >
                      Decorations
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      //onClick={() => navigate("/profile/history")}
                    >
                      History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      //onClick={() => navigate("/profile/favourites")}
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
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Christmas Lights App</span>
                <img className="h-8 w-auto" src={logo} alt="" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                  >
                    Home
                  </Link>
                  <Link
                    to="/explore"
                    search={{ currentPlace }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                  >
                    Explore
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    to="/app"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                  >
                    Get the app
                  </Link>
                  <Button
                    variant="link"
                    className="text-foreground -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                    onClick={() => login()}
                  >
                    Log in
                  </Button>
                </div>
                <div className="py-6 w-full">
                  <Button className="w-full rounded-full">Get Premium</Button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1acd81] to-[#dc2626] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Explore amazing Christmas decorations
            </h1>
            <p className="mt-6 text-lg leading-8">
              Bring the holiday cheer to life! Create, share, rate and discover
              stunning Christmas decorations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Input
                className="h-16 rounded-full text-xl"
                placeholder="Search by city, country or decoration name"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1acd81] to-[#dc2626] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
