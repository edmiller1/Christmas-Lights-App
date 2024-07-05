import { useEffect, useState } from "react";
import { Hero } from "./components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { SIGN_IN } from "@/graphql/mutations";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const Home = () => {
  const { toast } = useToast();
  const { isAuthenticated, login, logout, user } = useKindeAuth();

  const [currentPlace, setCurrentPlace] = useState<string>("");

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

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${localStorage.getItem(
          "longitude"
        )},${localStorage.getItem("latitude")}.json?access_token=${mbApiKey}`
      );
      const jsonData = await response.json();
      const place = jsonData.features.find((item: any) =>
        item.id.includes("place")
      );
      setCurrentPlace(place.text);
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (user) {
      signIn();
    }
  }, [user]);

  return (
    <>
      <Hero
        currentPlace={currentPlace}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        login={login}
      />
    </>
  );
};
