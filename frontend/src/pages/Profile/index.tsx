import {
  GetUser as GetUserData,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Bell,
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
import { AppHeaderLoading } from "@/components/AppHeader/components";
import { SEO } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ProfileLoading } from "./components";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

export const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const { logout } = useKindeAuth();
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("vite-ui-theme")
  );
  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const { loading: getUserLoading } = useQuery(GET_USER, {
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        //setCurrentUser(data.getUser);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
    sessionStorage.removeItem("token");
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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <CircleNotch
          size={72}
          weight="bold"
          className="animate-spin text-ch-dark dark:text-ch-light"
        />
        <p className="mt-5 text-xl">Logging Out...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        description={`Profile for ${currentUser?.name}`}
        name={`${currentUser?.name} Profile`}
        title={`${currentUser?.name} Profile`}
        type={`Profile for ${currentUser?.name}`}
      />
      {/* Mobile */}
      <div className="px-8 pt-10 min-h-[130vh] h-full sm:hidden">
        {getUserLoading ? <AppHeaderLoading /> : <div>Hello</div>}
        <h1 className="text-3xl font-bold">Profile</h1>
        {/* User image & name */}
        <div className="my-5 flex space-x-5 items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={currentUser?.image} />
            <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xl">{currentUser?.name}</span>
        </div>
        {/* Premium Card */}
        {!currentUser?.premium ? (
          <div
            className="bg-secondary mt-5 rounded-lg border shadow-lg dark:border-black"
            onClick={() => navigate("/premium")}
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex flex-col w-2/3">
                <span className="text-lg font-semibold">Get Premium</span>
                <span className="text-sm mt-2">Create and explore more</span>
              </div>
              <div className="w-1/3 flex justify-end">
                <CaretRight size={32} weight="bold" />
              </div>
            </div>
          </div>
        ) : null}

        {/* Account Settings */}
        <div className="my-10 ml-1">
          <h2 className="font-semibold text-2xl">Account Settings</h2>
          <div
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/personal-info", { state: currentUser?.id })
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
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/notification-settings", {
                state: currentUser?.id,
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
          <div className="my-7 flex items-center justify-between">
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
          <h2 className="font-semibold text-2xl">Decorations</h2>
          <div
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/decorations", { state: currentUser?.id })
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
          <div
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/history", { state: currentUser?.id })
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
          <div
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/favourites", { state: currentUser?.id })
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
          <div className="my-7 flex items-center justify-between">
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
        <div className="mt-10 flex flex-col justify-center items-center">
          <Button className="w-full" onClick={signUserOut}>
            Log out
          </Button>
          <div className="mt-5 flex justify-center items-center">
            <Link to="/terms" className="mr-1">
              <span className="text-xs underline">Terms of Service</span>
            </Link>
            &middot;
            <Link to="/policy" className="ml-1">
              <span className="text-xs underline">Privacy Policy</span>
            </Link>
          </div>
          <div>
            <span className="dark:text-gray-400 text-xs font-light">
              &copy; {new Date().getFullYear()} Christmas Lights App. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        {getUserLoading ? <AppHeaderLoading /> : <div>Hello</div>}
        <div className="lg:mx-28 xl:mx-96 py-24 sm:min-h-screen">
          <h1 className="text-4xl font-bold tracking-wide">Profile</h1>
          <h3 className="mt-2 text-lg">
            {currentUser?.name} - {currentUser?.email}
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
            <Card
              className="p-3 cursor-pointer"
              onClick={() =>
                navigate("/profile/personal-info", { state: currentUser?.id })
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
              onClick={() =>
                navigate("/profile/notification-settings", {
                  state: currentUser?.id,
                })
              }
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
              onClick={() =>
                navigate("/profile/decorations", { state: currentUser?.id })
              }
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
              onClick={() =>
                navigate("/profile/history", { state: currentUser?.id })
              }
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
              onClick={() =>
                navigate("/profile/favourites", { state: currentUser?.id })
              }
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
