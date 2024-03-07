import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "./graphql/queries/getUser/types";
import { AppHeader } from "./components";
import { useEffect, useState } from "react";
import { AppHeaderLoading } from "./components/AppHeader/components";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthProvider, useAuth, useUserData } from "./lib/hooks";
import { UserContext } from "./lib/context";
import { Home } from "./pages";
import { SIGN_IN } from "./graphql/mutations/signIn";
import {
  SignIn as SignInData,
  SignInArgs,
} from "./graphql/mutations/signIn/types";

function App() {
  const { currentUser, session } = useAuth();
  console.log(currentUser);
  console.log(session);

  const [user, setUser] = useState<Get_User | null>(null);

  const [signIn, { loading: signInLoading }] = useMutation<
    SignInData,
    SignInArgs
  >(SIGN_IN, {
    onCompleted(data) {
      if (data && data.signIn) {
        if (data.signIn.token) {
          sessionStorage.setItem("token", data.signIn.token);
          getUser();
        }
      } else {
        sessionStorage.removeItem("token");
      }
    },
    onError: () => {
      //
    },
  });

  const [getUser, { loading: getUserLoading }] = useLazyQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: currentUser ? currentUser.id : "" } },
    onCompleted: (data) => {
      setUser(data.getUser);
    },
  });

  const getCoords = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "latitude",
          JSON.stringify(position.coords.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(position.coords.longitude)
        );
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (session) {
      const sessionData = {
        input: {
          result: {
            id: session?.user.id,
            token: session?.access_token,
            name: session?.user.user_metadata.full_name as string,
            email: session?.user.email as string,
            photoURL: session?.user.user_metadata.picture as string,
            provider: session?.user.app_metadata.provider as string,
          },
        },
      };
      signIn({ variables: { input: sessionData.input } });
    }
  }, []);

  return (
    <>
      {getUserLoading || signInLoading ? (
        <AppHeaderLoading />
      ) : (
        <AppHeader user={user} />
      )}
      <Home />
    </>
  );
}

export default App;
