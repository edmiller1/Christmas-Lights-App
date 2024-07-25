import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Bell,
  CaretLeft,
  CaretRight,
  CircleNotch,
  ClockCounterClockwise,
  Gauge,
  Heart,
  HouseLine,
  Moon,
  UserCircle,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/ui/theme-provider";
import { Switch } from "@/components/ui/switch";
import { SEO } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ProfileLoading } from "./components";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { GetUser as GetUserData } from "@/graphql/queries/getUser/types";
import logo from "../../assets/logo.png";

export const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const { logout } = useKindeAuth();
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("vite-ui-theme")
  );
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const { data: getUserData, loading: getUserLoading } = useQuery<GetUserData>(
    GET_USER,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const changeTheme = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light");
      setTheme("light");
    } else {
      setCurrentTheme("dark");
      setTheme("dark");
    }
  };

  const signUserOut = () => {
    setLogoutLoading(true);
    toast({
      title: "Success 🎉",
      description: "Signed out successfully!",
    });
    logout();
    setTimeout(() => {
      setLogoutLoading(false);
    }, 2000);
    navigate("/");
  };

  if (getUserLoading) {
    return <ProfileLoading />;
  }

  if (logoutLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CircleNotch
          size={72}
          weight="bold"
          className="animate-spin text-ch-dark dark:text-ch-light"
        />
        <p className="mt-5 text-xl">Logging Out...</p>
      </div>
    );
  }

  const user = getUserData?.getUser ? getUserData.getUser : null;

  return (
    <>
      <SEO
        description={`Profile for ${user?.name}`}
        name={`${user?.name} Profile`}
        title={`${user?.name} Profile`}
        type={`Profile for ${user?.name}`}
      />
      {/* Mobile */}
      <div className="px-8 pt-5 min-h-[130vh] h-full sm:hidden">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <CaretLeft size={28} weight="bold" />
          </Link>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        {/* User image & name */}
        <div className="flex items-center my-5 space-x-5">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xl">{user?.name}</span>
        </div>
        {/* Premium Card */}
        {!user?.premium ? (
          <div
            className="mt-5 border rounded-lg shadow-lg bg-secondary dark:border-black"
            onClick={() => navigate("/premium")}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col w-2/3">
                <span className="text-lg font-semibold">Get Premium</span>
                <span className="mt-2 text-sm">Create and explore more</span>
              </div>
              <div className="flex justify-end w-1/3">
                <CaretRight size={32} weight="bold" />
              </div>
            </div>
          </div>
        ) : null}

        {/* Account Settings */}
        <div className="my-10 ml-1">
          <h2 className="text-2xl font-semibold">Account Settings</h2>
          <div
            className="flex items-center justify-between my-7"
            onClick={() =>
              navigate("/profile/personal-info", { state: user?.id })
            }
          >
            <div className="flex items-center space-x-5">
              <UserCircle
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>Personal Info</span>
            </div>
            <CaretRight size={24} className="text-ch-dark dark:text-ch-light" />
          </div>
          <div
            className="flex items-center justify-between my-7"
            onClick={() =>
              navigate("/profile/notification-settings", {
                state: user?.id,
              })
            }
          >
            <div className="flex items-center space-x-5">
              <Bell
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>Notifications</span>
            </div>
            <CaretRight size={24} className="text-ch-dark dark:text-ch-light" />
          </div>
          <Separator />
        </div>
        {/* Dashboard */}
        <div className="my-10 ml-1">
          <div className="flex items-center justify-between my-7">
            <div className="flex items-center space-x-20">
              <div className="flex items-center space-x-5">
                <Gauge size={32} weight="thin" />
                <span>Dashboard</span>
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <CaretRight size={24} />
          </div>
          <Separator />
        </div>
        {/* Decorations */}
        <div className="my-10 ml-1">
          <h2 className="text-2xl font-semibold">Decorations</h2>
          <div
            className="flex items-center justify-between my-7"
            onClick={() =>
              navigate("/profile/decorations", {
                state: { decorations: user?.decorations, userName: user?.name },
              })
            }
          >
            <div className="flex items-center space-x-5">
              <HouseLine
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>Your Decorations</span>
            </div>
            <CaretRight size={24} className="text-ch-dark dark:text-ch-light" />
          </div>
          {/* History */}
          <div
            className="flex items-center justify-between my-7"
            onClick={() =>
              navigate("/profile/history", {
                state: { history: user?.history, userName: user?.name },
              })
            }
          >
            <div className="flex items-center space-x-5">
              <ClockCounterClockwise
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>History</span>
            </div>
            <CaretRight size={24} className="text-ch-dark dark:text-ch-light" />
          </div>
          {/* Favourites */}
          <div
            className="flex items-center justify-between my-7"
            onClick={() =>
              navigate("/profile/favourites", {
                state: { favourites: user?.favourites, userName: user?.name },
              })
            }
          >
            <div className="flex items-center space-x-5">
              <Heart
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>Favourites</span>
            </div>
            <CaretRight size={24} className="text-ch-dark dark:text-ch-light" />
          </div>
          <Separator />
        </div>
        <div className="my-10 ml-1">
          <div className="flex items-center justify-between my-7">
            <div className="flex items-center space-x-5">
              <Moon
                size={32}
                weight="thin"
                className="text-ch-dark dark:text-ch-light"
              />
              <span>Dark Mode</span>
            </div>
            <Switch
              checked={currentTheme === "dark"}
              onCheckedChange={changeTheme}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center justify-center mt-10">
          <Button className="w-full" onClick={signUserOut}>
            Log out
          </Button>
          <div className="flex items-center justify-center mt-5">
            <Link to="/terms" className="mr-1">
              <span className="text-xs underline">Terms of Service</span>
            </Link>
            &middot;
            <Link to="/policy" className="ml-1">
              <span className="text-xs underline">Privacy Policy</span>
            </Link>
          </div>
          <div>
            <span className="pb-10 text-xs font-light dark:text-gray-400">
              &copy; {new Date().getFullYear()} Christmas Lights App. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10 m-4 cursor-pointer" />
        </Link>
        <div className="py-24 sm:mx-5 md:mx-12 lg:mx-24 xl:mx-28 2xl:mx-96 sm:min-h-screen">
          <h1 className="text-4xl font-bold tracking-wide">Profile</h1>
          <h3 className="mt-2 text-lg">
            {user?.name} - {user?.email}
          </h3>
          <div className="grid grid-cols-2 mt-10 gap-x-6 gap-y-10">
            <Card
              className="p-3 cursor-pointer"
              onClick={() =>
                navigate("/profile/personal-info", { state: user?.id })
              }
            >
              <UserCircle
                size={36}
                className="text-ch-dark dark:text-ch-light"
              />
              <div>
                <h4 className="text-lg">Personal Info</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  View and edit your name and avatar information.
                </p>
              </div>
            </Card>
            <Card
              className="p-3 cursor-pointer"
              // onClick={() =>
              //   navigate("/profile/dashboard", { state: currentUser?.id })
              // }
            >
              <div className="flex justify-between">
                <Gauge size={36} className="text-ch-dark dark:text-ch-light" />
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <div>
                <h4 className="text-lg">Dashboard</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  View insights for your decorations
                </p>
              </div>
            </Card>
            <Card
              className="p-3 cursor-pointer"
              onClick={() => navigate("/profile/notification-settings")}
            >
              <Bell size={36} className="text-ch-dark dark:text-ch-light" />
              <div>
                <h4 className="text-lg">Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Choose what notifications you want to see, and where you see
                  them.
                </p>
              </div>
            </Card>
            <Card
              className="p-3 cursor-pointer"
              onClick={() => navigate("/profile/decorations")}
            >
              <HouseLine
                size={36}
                className="text-ch-dark dark:text-ch-light"
              />
              <div>
                <h4 className="text-lg">Decorations</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  View and manage your decorations.
                </p>
              </div>
            </Card>
            <Card
              className="p-3 cursor-pointer"
              onClick={() => navigate("/profile/history")}
            >
              <ClockCounterClockwise
                size={36}
                className="text-ch-dark dark:text-ch-light"
              />
              <div>
                <h4 className="text-lg">History</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  View your recently visited decorations.
                </p>
              </div>
            </Card>
            <Card
              className="p-3 cursor-pointer"
              onClick={() => navigate("/profile/favourites")}
            >
              <Heart size={36} className="text-ch-dark dark:text-ch-light" />
              <div>
                <h4 className="text-lg">Favourites</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Decorations you think are really awesome.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
