import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dashboard, Login, SideNav } from "./components";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Link, Outlet, redirect } from "react-router-dom";
import { CircleNotch, User } from "@phosphor-icons/react";

export const Admin = () => {
  const currentUser = useUser();
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser && currentUser?.app_metadata.provider !== "email") {
      console.log(currentUser);
      logOut();
    }
  }, []);

  const logOut = async () => {
    setLogoutLoading(true);
    await supabase.auth
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
          redirect("/admin");
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

  if (!currentUser || currentUser.app_metadata.provider !== "email") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <User
          size={40}
          weight="bold"
          className="text-ch-dark dark:text-ch-light"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Not Logged In
        </h1>
        <p className="mt-6 text-base leading-7 mx-10 text-center sm:mx-3">
          You need to log in using an admin account to use the admin dashboard
        </p>
        <div className="flex justify-center items-center space-x-5 mt-10">
          <Link
            to="/admin/login"
            className="underline text-ch-red hover:text-ch-red-hover"
          >
            Login
          </Link>
          <Link
            to="/"
            className="underline text-ch-red hover:text-ch-red-hover"
          >
            Home
          </Link>
        </div>
      </div>
    );
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
    <div className="min-h-screen">
      <SideNav logOut={logOut} />
      <Outlet />
    </div>
  );
};
