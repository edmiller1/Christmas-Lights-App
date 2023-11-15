import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dashboard, Login, SideNav } from "./components";
import { User, useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Outlet, redirect } from "react-router-dom";

export const Admin = () => {
  const currentUser = useUser();
  const { toast } = useToast();
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser && currentUser?.app_metadata.provider !== "email") {
      logOut();
    }
  }, []);

  const logOut = async () => {
    await supabase.auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: `${error}`,
        });
      });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
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
        setLoading(false);
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
        setLoading(false);
      }, 2000);
    }
  };

  if (!currentUser || currentUser.app_metadata.provider !== "email") {
    return <Login login={login} loading={loading} />;
  }
  return (
    <div className="min-h-screen">
      <SideNav />
      <Outlet />
    </div>
  );
};
