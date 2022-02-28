import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dashboard, Login, SideNav } from "./components";
import { User, useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Outlet, redirect } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";

export const Admin = () => {
  const currentUser = useUser();
  const { toast } = useToast();
  const [admin, setAdmin] = useState<User | null>(null);
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

  const login = async (email: string, password: string) => {
    setLoginLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: `${error}`,
      });
      setTimeout(() => {
        setLoginLoading(false);
      }, 2000);
      redirect("/admin");
    } else {
      console.log(data);
      setAdmin(data.user);
      toast({
        variant: "success",
        title: "Success 🎉",
        description: "Logged in successfully!",
      });
      setTimeout(() => {
        setLoginLoading(false);
      }, 2000);
    }
  };

  if (!currentUser || currentUser.app_metadata.provider !== "email") {
    return <Login login={login} loading={loginLoading} />;
  }

  if (logoutLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircleNotch
          size={72}
          weight="bold"
          className="animate-spin text-ch-dark dark:text-ch-light"
        />
        <p className="mt-4 text-xl">Logging Out...</p>
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
