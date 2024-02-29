import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Bell,
  CaretRight,
  CircleNotch,
  ClockCounterClockwise,
  Heart,
  HouseLine,
  Moon,
  UserCircle,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ProfileLoading } from "./components";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/ui/theme-provider";
import { Switch } from "@/components/ui/switch";
import { useUserData } from "@/lib/hooks";
import { auth } from "@/lib/firebase";
import { AppHeaderLoading } from "@/components/AppHeader/components";
import { AppHeader } from "@/components";

export const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useUserData();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("vite-ui-theme")
  );
  const [user, setUser] = useState<Get_User | null>(null);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const { loading: getUserLoading } = useQuery<GetUserData, GetUserArgs>(
    GET_USER,
    {
      variables: { input: { id: currentUser ? currentUser.uid : "" } },
      onCompleted: (data) => {
        if (data) {
          setUser(data.getUser);
        }
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

  const logOut = async () => {
    setLogoutLoading(true);
    await auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
        setTimeout(() => {
          setLogoutLoading(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: `${error}`,
        });
        setTimeout(() => {
          setLogoutLoading(false);
        }, 2000);
      });
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
      {/* Mobile */}
      <div className="px-8 pt-10 min-h-[110vh] h-full sm:hidden">
        {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
        <h1 className="text-3xl font-bold">Profile</h1>
        {/* User image & name */}
        <div className="my-5 flex space-x-5 items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xl">{user?.name}</span>
        </div>
        {/* Decoration Card */}
        {/* <div className="mt-5 rounded-lg border shadow-lg dark:border-black">
          <div className="flex justify-between items-center p-4">
            <div className="flex flex-col w-2/3">
              <span className="text-lg font-semibold">
                Create your decoration
              </span>
              <span className="text-sm mt-2">
                It's easy to setup and get started.
              </span>
            </div>
            <div className="w-1/3">
              <img src={svg} alt="Christmas House" className="w-32 h-32" />
            </div>
          </div>
        </div> */}
        {/* Account Settings */}
        <div className="my-10 ml-1">
          <h2 className="font-semibold text-2xl">Account Settings</h2>
          <div
            className="my-7 flex items-center justify-between"
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
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/notification-settings", { state: user?.id })
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
        {/* Decorations */}
        <div className="my-10 ml-1">
          <h2 className="font-semibold text-2xl">Decorations</h2>
          <div
            className="my-7 flex items-center justify-between"
            onClick={() =>
              navigate("/profile/decorations", { state: user?.id })
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
            onClick={() => navigate("/profile/history", { state: user?.id })}
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
            onClick={() => navigate("/profile/favourites", { state: user?.id })}
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
          <Button variant="outline" className="w-full" onClick={logOut}>
            Log out
          </Button>
          <div className="mt-5 flex justify-center items-center">
            <Link to="/" className="mr-1">
              <span className="text-xs underline">Terms of Service</span>
            </Link>
            &middot;
            <Link to="/" className="ml-1">
              <span className="text-xs underline">Privacy Policy</span>
            </Link>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-light">
              &copy; {new Date().getFullYear()} Christmas Lights App. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
        <div className="sm:mx-96 sm:py-24 sm:min-h-screen">
          <h1 className="text-4xl font-bold tracking-wide">Profile</h1>
          <h3 className="mt-2 text-lg">
            {user?.name} - {user?.email}
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
            <div
              className="profile-card flex flex-col rounded-lg p-2 space-y-3 shadow-lg cursor-pointer bg-white dark:bg-zinc-800"
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
            </div>
            <div
              className="profile-card flex flex-col rounded-lg p-2 space-y-3 shadow-lg cursor-pointer dark:bg-zinc-800"
              onClick={() =>
                navigate("/profile/notification-settings", { state: user?.id })
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
            </div>
            <div
              className="profile-card flex flex-col rounded-lg p-2 space-y-3 shadow-lg cursor-pointer dark:bg-zinc-800"
              onClick={() =>
                navigate("/profile/decorations", { state: user?.id })
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
            </div>
            <div
              className="profile-card flex flex-col rounded-lg p-2 space-y-3 shadow-lg cursor-pointer dark:bg-zinc-800"
              onClick={() => navigate("/profile/history", { state: user?.id })}
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
            </div>
            <div
              className="profile-card flex flex-col rounded-lg p-2 space-y-3 shadow-lg cursor-pointer dark:bg-zinc-800"
              onClick={() =>
                navigate("/profile/favourites", { state: user?.id })
              }
            >
              <Heart size={36} className="text-ch-dark dark:text-ch-light" />
              <div>
                <h4 className="text-lg">Favourites</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Decorations you think are really awesome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
