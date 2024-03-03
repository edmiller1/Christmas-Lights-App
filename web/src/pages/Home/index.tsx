import { useQuery } from "@apollo/client";
import {
  GET_DECORATIONS_BY_CITY,
  GET_DECORATIONS_BY_RATING,
  GET_USER,
} from "@/graphql/queries";
import { GetDecorationsByCity as GetDecorationsByCityData } from "@/graphql/queries/getDecorationsByCity/types";
import { GetDecorationByRating as GetDecorationsByRatingData } from "@/graphql/queries/getDecorationsByRating/types";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "@/graphql/queries/getUser/types";
import { DecorationCard } from "@/components";
import { DecorationsLoading, HomeFooter, HomeMap } from "./components";
import { useState } from "react";
import { ListBullets, MapTrifold } from "@phosphor-icons/react";
import { useUserData } from "@/lib/hooks";

export const Home = () => {
  const currentUser = useUserData();

  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);

  const { data: getUserData, refetch: refetchUser } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: currentUser ? currentUser.uid : "" } },
    notifyOnNetworkStatusChange: true,
  });

  const { data: decorationsByCityData, loading: decorationsByCityLoading } =
    useQuery<GetDecorationsByCityData>(GET_DECORATIONS_BY_CITY);

  const { data: decorationsByRatingData, loading: decorationsByRatingLoading } =
    useQuery<GetDecorationsByRatingData>(GET_DECORATIONS_BY_RATING);

  const user = getUserData?.getUser ? getUserData.getUser : null;

  const decorationsByCity = decorationsByCityData?.getDecorationsByCity
    ? decorationsByCityData.getDecorationsByCity
    : null;

  const decorationsByRating = decorationsByRatingData?.getDecorationsByRating
    ? decorationsByRatingData.getDecorationsByRating
    : null;

  const refetchUserData = () => {
    refetchUser();
  };

  if (decorationsByCityLoading || decorationsByRatingLoading) {
    return <DecorationsLoading />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={user?.favourites.map((favourite) => favourite.id)}
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
                    userFavourites={user?.favourites.map(
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
                      userFavourites={user?.favourites.map(
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
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={user?.favourites.map((favourite) => favourite.id)}
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
                    userFavourites={user?.favourites.map(
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
                      userFavourites={user?.favourites.map(
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
