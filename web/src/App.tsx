import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "./graphql/queries/getUser/types";
import { AppHeader } from "./components";
import { useEffect } from "react";
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

  const [signIn, { loading: signInLoading }] = useMutation<
    SignInData,
    SignInArgs
  >(SIGN_IN, {
    onCompleted(data) {
      if (data && data.signIn) {
        if (data.signIn.token) {
          sessionStorage.setItem("token", data.signIn.token);
        }
      } else {
        sessionStorage.removeItem("token");
      }
    },
    onError: () => {
      //
    },
  });

  const { data: getUserData, loading: getUserLoading } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    //@ts-ignore
    variables: { input: { id: currentUser ? currentUser.uid : "" } },
    skip: !currentUser,
  });

  const user = getUserData?.getUser ? getUserData.getUser : null;

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
    const sessionData = {
      input: {
        result: {
          id: session?.user.id,
          token: session?.access_token,
          name: session?.user.user_metadata.full_name,
          email: session?.user.email,
          photoURL: session?.user.user_metadata.picture,
          provider: session?.user.app_metadata.provider,
        },
      },
    };
    signIn({ variables: { input: sessionData.input } });
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
