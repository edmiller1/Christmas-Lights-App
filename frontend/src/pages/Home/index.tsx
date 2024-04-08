import { AppHeader } from "@/components/AppHeader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_IN } from "@/graphql/mutations";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { AppHeaderLoading } from "@/components/AppHeader/components";

export const Home = () => {
  const { getToken, isAuthenticated, user } = useKindeAuth();
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  const [getUser, { loading: getUserLoading }] = useLazyQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    onCompleted: (data) => {
      setCurrentUser(data.getUser);
    },
  });

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    onCompleted: (data) => {
      toast({
        variant: "default",
        title: "Signed in Successfully!",
      });
      sessionStorage.setItem("token", data.signIn.token);
      localStorage.removeItem("user");
      getUser({ variables: { input: { id: data.signIn.id } } });
    },
  });

  const signInUser = async () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);

      const data = {
        input: {
          result: {
            id: user.id,
            name: `${user.given_name} ${user.family_name}`,
            email: user.email,
            photoURL: user.picture,
            token: (await getToken()) as string,
          },
        },
      };

      signIn({ variables: { input: data.input } });
    } else {
      const data = {
        input: {
          result: {
            id: user?.id as string,
            name: `${user?.given_name} ${user?.family_name}`,
            email: user?.email as string,
            photoURL: user?.picture as string,
            token: (await getToken()) as string,
          },
        },
      };
      signIn({ variables: { input: data.input } });
    }
  };

  const hasSession = async () => {
    const token = await getToken();
    if (!token) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    signInUser();
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (isAuthenticated && user && user.id && !userString) {
      getUser({ variables: { input: { id: user.id } } });
    }
  }, [user]);

  useEffect(() => {
    hasSession();
  }, [getToken]);

  return (
    <>
      {getUserLoading ? (
        <AppHeaderLoading />
      ) : (
        <AppHeader
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
        />
      )}
    </>
  );
};
