import { AppHeader } from "@/components/AppHeader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_IN } from "@/graphql/mutations";
import { GET_USER } from "@/graphql/queries/getUser";
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

export const Home = () => {
  const { isAuthenticated } = useKindeAuth();
  const { toast } = useToast();

  const [user, setUser] = useState<Get_User | undefined>();

  const [getUser] = useLazyQuery<GetUserData, GetUserArgs>(GET_USER, {
    onCompleted: (data) => {
      setUser(data.getUser);
    },
  });

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    onCompleted: (data) => {
      toast({
        variant: "default",
        title: "Signed in Successfully!",
      });
      localStorage.removeItem("user");
      getUser({ variables: { input: { id: data.signIn.id } } });
    },
  });

  const signInUser = () => {
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
          },
        },
      };

      signIn({ variables: { input: data.input } });
    }
  };

  useEffect(() => {
    signInUser();
  }, [localStorage.getItem("user")]);

  return <AppHeader isAuthenticated={isAuthenticated} user={user} />;
};
