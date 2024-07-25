import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Outlet, useNavigate } from "react-router-dom";
import { SideNav } from "./components";

export const Admin = () => {
  const { logout, user } = useKindeAuth();
  const navigate = useNavigate();

  const [notAdmin, setNotAdmin] = useState<boolean>(false);

  console.log(user);

  useEffect(() => {
    if (user && user.email !== "admin@christmaslightsapp.com") {
      setNotAdmin(true);
    }
  }, [user]);

  // if (!user) {
  //   return <Login />;
  // }

  if (user && user.email === "admin@christmaslightsapp.com") {
    return <></>;
  }

  if (notAdmin) {
    return (
      <AlertDialog open={notAdmin}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Denied</AlertDialogTitle>
            <AlertDialogDescription>
              The current account does not have access to this section. If you
              have an admin account, please log out and log in with the correct
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate(-1)}>
              Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => logout()}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="min-h-screen">
      <SideNav />
      <Outlet />
    </div>
  );
};
