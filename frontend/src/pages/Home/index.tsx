import { AppHeader } from "@/components/AppHeader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Home = () => {
  const { isAuthenticated } = useKindeAuth();

  return <AppHeader isAuthenticated={isAuthenticated} />;
};
