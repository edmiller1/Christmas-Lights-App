import { SignIn } from "@/pages";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useKindeAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    return <SignIn />;
  }

  if (!isLoading && isAuthenticated) {
    return <Outlet />;
  }
}
