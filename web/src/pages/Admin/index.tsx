import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { Login, SideNav } from "./components";
import { useToast } from "@/components/ui/use-toast";
import { Link, Outlet, redirect } from "react-router-dom";
import { CircleNotch, User } from "@phosphor-icons/react";
import { useUserData } from "@/lib/hooks";

export const Admin = () => {
  const currentUser = useUserData();
  const { toast } = useToast();
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser && currentUser?.providerData[0].providerId !== "password") {
      logOut();
    }
  }, []);

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
        sessionStorage.removeItem("token");
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

  if (currentUser && currentUser.providerData[0].providerId !== "password") {
    return <Login />;
  }

  if (!currentUser) {
    return <Login />;
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
      {window.location.pathname.includes("login") ? null : (
        <SideNav logOut={logOut} />
      )}
      <Outlet />
    </div>
  );
};
