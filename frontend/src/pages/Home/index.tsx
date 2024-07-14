import { useEffect } from "react";
import { Hero } from "./components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { SIGN_IN } from "@/graphql/mutations";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import { useMutation } from "@apollo/client";

export const Home = () => {
  const { isAuthenticated, login, logout, user } = useKindeAuth();

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    variables: {
      input: {
        result: {
          id: user?.id || "",
          name: user?.given_name + " " + user?.family_name,
          email: user?.email || "",
          photoURL: user?.picture || "",
        },
      },
    },
  });

  useEffect(() => {
    if (user) {
      signIn();
    }
  }, [user]);

  return (
    <>
      <Hero
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        login={login}
      />
    </>
  );
};
