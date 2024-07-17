import { useEffect, useState } from "react";
import { Hero } from "./components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { SIGN_IN } from "@/graphql/mutations";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import {
  GetUser as GetUserData,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

export const Home = () => {
  const { isAuthenticated, login, logout, user } = useKindeAuth();
  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  const [getUser] = useLazyQuery<GetUserData>(GET_USER, {
    onCompleted: (data) => {
      setCurrentUser(data.getUser);
    },
  });

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
      getUser();
    }
  }, [user]);

  return (
    <>
      <Hero
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        login={login}
        currentUser={currentUser}
      />
    </>
  );
};
