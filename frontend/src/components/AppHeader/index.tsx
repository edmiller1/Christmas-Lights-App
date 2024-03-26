import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  CreateButton,
  LoggedOutUserMenu,
  NotificationButton,
  UserMenu,
} from "./components";

interface Props {
  isAuthenticated: boolean;
}

export const AppHeader = ({ isAuthenticated }: Props) => {
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
              {isAuthenticated ? <NotificationButton /> : null}
              {isAuthenticated ? <UserMenu /> : <LoggedOutUserMenu />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
