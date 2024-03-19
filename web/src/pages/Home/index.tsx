import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_DECORATIONS_BY_CITY,
  GET_DECORATIONS_BY_RATING,
  GET_USER,
} from "@/graphql/queries";
import { SIGN_IN } from "@/graphql/mutations";
import { GetDecorationsByCity as GetDecorationsByCityData } from "@/graphql/queries/getDecorationsByCity/types";
import { GetDecorationByRating as GetDecorationsByRatingData } from "@/graphql/queries/getDecorationsByRating/types";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import {
  SignIn as SignInData,
  SignInArgs,
} from "../../graphql/mutations/signIn/types";
import { AppHeader, DecorationCard } from "@/components";
import { DecorationsLoading, HomeFooter, HomeMap } from "./components";
import { useEffect, useState } from "react";
import { ListBullets, MapTrifold } from "@phosphor-icons/react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppHeaderLoading } from "@/components/AppHeader/components";

export const Home = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);

  const [getUser, { loading: getUserLoading, refetch: refetchUser }] =
    useLazyQuery<GetUserData, GetUserArgs>(GET_USER, {
      variables: { input: { id: user ? user.id : "" } },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setCurrentUser(data.getUser);
      },
    });

  const { data: decorationsByCityData, loading: decorationsByCityLoading } =
    useQuery<GetDecorationsByCityData>(GET_DECORATIONS_BY_CITY);

  const { data: decorationsByRatingData, loading: decorationsByRatingLoading } =
    useQuery<GetDecorationsByRatingData>(GET_DECORATIONS_BY_RATING);

  const decorationsByCity = decorationsByCityData?.getDecorationsByCity
    ? decorationsByCityData.getDecorationsByCity
    : null;

  const decorationsByRating = decorationsByRatingData?.getDecorationsByRating
    ? decorationsByRatingData.getDecorationsByRating
    : null;

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    onCompleted: (data) => {
      sessionStorage.setItem("token", data.signIn.token);
      getUser();
    },
    onError: () => {
      //error
    },
  });

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

  const refetchUserData = () => {
    refetchUser();
  };

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

  if (decorationsByCityLoading || decorationsByRatingLoading) {
    return <DecorationsLoading />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden min-h-screen">
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={currentUser?.favourites.map(
              (favourite) => favourite.id
            )}
          />
        ) : (
          <div className="px-6 overflow-y-auto py-16">
            {decorationsByCity && decorationsByCity.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 my-8">
                {decorationsByCity.map((decoration, index) => (
                  <DecorationCard
                    key={decoration.id}
                    index={index}
                    currentUser={currentUser}
                    decoration={decoration}
                    decorations={decorationsByCity}
                    userFavourites={currentUser?.favourites.map(
                      (favourite) => favourite.id
                    )}
                    refetchUserData={refetchUserData}
                  />
                ))}
              </div>
            ) : null}
            <>
              {decorationsByRating && decorationsByRating.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 my-8">
                  {decorationsByRating.map((decoration, index) => (
                    <DecorationCard
                      key={decoration.id}
                      index={index}
                      currentUser={currentUser}
                      decoration={decoration}
                      decorations={decorationsByRating}
                      userFavourites={currentUser?.favourites.map(
                        (favourite) => favourite.id
                      )}
                      refetchUserData={refetchUserData}
                    />
                  ))}
                </div>
              ) : null}
            </>
          </div>
        )}

        {!showMap ? (
          <div className="fixed bottom-24 left-[41%] z-20">
            <button
              onClick={() => setShowMap(true)}
              className="flex items-center text-sm py-2 px-3 font-semibold rounded-full shadow-lg text-white bg-ch-teal z-50 hover:scale-110 transition-all"
            >
              Map
              <MapTrifold
                size={24}
                weight="fill"
                color="#ffffff"
                className="ml-2"
              />
            </button>
          </div>
        ) : (
          <div className="fixed bottom-24 left-[41%] z-20">
            <button
              disabled={mapLoading}
              onClick={() => setShowMap(false)}
              className="flex items-center text-sm py-2 px-3 font-semibold rounded-full shadow-lg text-white bg-ch-teal z-[98] hover:scale-110 transition-all"
            >
              List
              <ListBullets size={24} color="#ffffff" className="ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block min-h-screen">
        {getUserLoading ? (
          <AppHeaderLoading />
        ) : (
          <AppHeader currentUser={currentUser} isSignedIn={isSignedIn} />
        )}
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={currentUser?.favourites.map(
              (favourite) => favourite.id
            )}
          />
        ) : (
          <div className="px-32 overflow-y-auto py-24">
            {decorationsByCity && decorationsByCity.length > 0 ? (
              <div className="grid grid-cols-6 gap-x-10 gap-y-10 my-8">
                {decorationsByCity.map((decoration, index) => (
                  <DecorationCard
                    key={decoration.id}
                    index={index}
                    currentUser={currentUser}
                    decoration={decoration}
                    decorations={decorationsByCity}
                    userFavourites={currentUser?.favourites.map(
                      (favourite) => favourite.id
                    )}
                    refetchUserData={refetchUserData}
                  />
                ))}
              </div>
            ) : null}
            <>
              {decorationsByRating && decorationsByRating.length > 0 ? (
                <div className="grid grid-cols-6 gap-x-6 gap-y-10 my-8">
                  {decorationsByRating.map((decoration, index) => (
                    <DecorationCard
                      key={decoration.id}
                      index={index}
                      currentUser={currentUser}
                      decoration={decoration}
                      decorations={decorationsByRating}
                      userFavourites={currentUser?.favourites.map(
                        (favourite) => favourite.id
                      )}
                      refetchUserData={refetchUserData}
                    />
                  ))}
                </div>
              ) : null}
            </>
          </div>
        )}

        {!showMap ? (
          <div className="fixed bottom-24 left-[47.5%] z-20">
            <button
              onClick={() => setShowMap(true)}
              className="flex items-center text-sm py-2 px-3 font-semibold rounded-full shadow-lg text-white bg-ch-teal hover:scale-110 transition-all"
            >
              Map
              <MapTrifold
                size={24}
                weight="fill"
                color="#ffffff"
                className="ml-2"
              />
            </button>
          </div>
        ) : (
          <div className="fixed bottom-24 left-[47.5%] z-20">
            <button
              disabled={mapLoading}
              onClick={() => setShowMap(false)}
              className="flex items-center text-sm py-2 px-3 font-semibold rounded-full shadow-lg text-white bg-ch-teal hover:scale-110 transition-all"
            >
              List
              <ListBullets size={24} color="#ffffff" className="ml-2" />
            </button>
          </div>
        )}
      </div>
      <HomeFooter />
    </>
  );
};
