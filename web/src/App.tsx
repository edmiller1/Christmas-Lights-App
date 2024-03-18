import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER } from "./graphql/queries";
import { SIGN_IN } from "./graphql/mutations";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "./graphql/queries/getUser/types";
import {
  SignIn as SignInData,
  SignInArgs,
} from "./graphql/mutations/signIn/types";
import { AppHeader } from "./components";
import { useEffect, useState } from "react";
import { AppHeaderLoading } from "./components/AppHeader/components";
import "mapbox-gl/dist/mapbox-gl.css";
import { Home } from "./pages";
import { useToast } from "./components/ui/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

function App() {
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  console.log(user);

  const createUserAccount = async () => {
    const token = await getToken();
    if (token && user) {
      signIn({
        variables: {
          input: {
            result: {
              email: user?.primaryEmailAddress?.emailAddress as string,
              id: user?.id as string,
              name: user?.fullName as string,
              photoURL: user?.imageUrl as string,
              provider: user?.externalAccounts[0].provider as string,
              token: token,
            },
          },
        },
      });
    }
  };

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  const [getUser, { loading: getUserLoading }] = useLazyQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: user ? user.id : "" } },
    onCompleted: (data) => {
      setCurrentUser(data.getUser);
    },
  });

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    onCompleted: (data) => {
      sessionStorage.setItem("token", data.signIn.token);
      getUser();
    },
    onError: () => {
      //error
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
    createUserAccount();
  }, [user]);

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <>
      {getUserLoading ? (
        <AppHeaderLoading />
      ) : (
        <AppHeader currentUser={currentUser} isSignedIn={isSignedIn} />
      )}
      <Home />
    </>
  );
}

export default App;
