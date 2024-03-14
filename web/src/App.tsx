import { useLazyQuery, useMutation } from "@apollo/client";
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
import { useAuth } from "./lib/hooks";
import { Home } from "./pages";
import { SIGN_IN } from "./graphql/mutations/signIn";
import {
  SignIn as SignInData,
  SignInArgs,
} from "./graphql/mutations/signIn/types";
import { useToast } from "./components/ui/use-toast";

function App() {
  const { toast } = useToast();
  const { currentUser, session } = useAuth();

  const [user, setUser] = useState<Get_User | null>(null);

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

  return (
    <>
      {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
      <Home />
    </>
  );
}

export default App;
