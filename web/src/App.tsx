import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "./graphql/queries/getUser/types";
import { AppHeader } from "./components";
import { useEffect } from "react";
import { AppHeaderLoading } from "./components/AppHeader/components";
import { Outlet } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserData } from "./lib/hooks";
import { UserContext } from "./lib/context";

function App() {
  const currentUser = useUserData();

  const { data: getUserData, loading: getUserLoading } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
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

  return (
    <UserContext.Provider value={currentUser}>
      <div className="min-h-screen">
        {window.location.pathname.includes("decoration") ? (
          <div className="hidden sm:block">
            {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
          </div>
        ) : (
          <>
            {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
          </>
        )}

        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
