import { useMutation, useQuery } from "@apollo/client";
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
import {
  FAVOURITE_DECORATION,
  UNFAVOURITE_DECORATION,
} from "@/graphql/mutations";
import {
  FavouriteDecoration as FavouriteDecorationData,
  FavouriteDecorationArgs,
} from "@/graphql/mutations/favouriteDecoration/types";
import {
  UnfavouriteDecoration as UnFavouriteDecorationData,
  UnfavouriteDecorationArgs,
} from "@/graphql/mutations/unfavouriteDecoration/types";
import { DecorationCard } from "@/components";
import { DecorationsLoading, HomeFooter, HomeMap } from "./components";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ListBullets, MapTrifold } from "@phosphor-icons/react";
import { useUserData } from "@/lib/hooks";

export const Home = () => {
  const currentUser = useUserData();
  const { toast } = useToast();

  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);

  const {
    data: getUserData,
    refetch: refetchUser,
    networkStatus: getUserNetworkStatus,
  } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
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

  //MUTATIONS
  const [favouriteDecoration, { loading: favouriteDecorationLoading }] =
    useMutation<FavouriteDecorationData, FavouriteDecorationArgs>(
      FAVOURITE_DECORATION,
      {
        onCompleted: () => {
          toast({
            variant: "success",
            title: "Success 🎉",
            description: "Decoration added to favourites ❤️",
          });
          refetchUser();
        },
        onError() {
          toast({
            variant: "destructive",
            title: "Success 🎉",
            description:
              "Failed to add decoration to favourites. Please Try again.",
          });
        },
      }
    );

  const [unFavouriteDecoration, { loading: unFavouriteDecorationLoading }] =
    useMutation<UnFavouriteDecorationData, UnfavouriteDecorationArgs>(
      UNFAVOURITE_DECORATION,
      {
        onCompleted: () => {
          toast({
            variant: "success",
            title: "Success 🎉",
            description: "Decoration removed from favourites ❤️",
          });
          refetchUser();
        },
        onError() {
          toast({
            variant: "destructive",
            title: "Success 🎉",
            description:
              "Failed to remove decoration to favourites. Please Try again.",
          });
        },
      }
    );

  const addDecorationsToFavourites = (decorationId: string) => {
    favouriteDecoration({ variables: { input: { id: decorationId } } });
  };

  const removeDecorationFromFavourites = (decorationId: string) => {
    unFavouriteDecoration({ variables: { input: { id: decorationId } } });
  };

  if (decorationsByCityLoading || decorationsByRatingLoading) {
    return <DecorationsLoading />;
  }

  return (
    <>
      <div className="sm:hidden">
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={user?.favourites}
          />
        ) : (
          <div className="px-6 overflow-y-auto py-16">
            {decorationsByCity && decorationsByCity.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 my-8">
                {decorationsByCity.map((decoration) => (
                  <DecorationCard
                    key={decoration.id}
                    decoration={decoration}
                    userFavourites={user?.favourites.map(
                      (favourite) => favourite.id
                    )}
                    addDecorationToFavourites={addDecorationsToFavourites}
                    removeDecorationFromFavourites={
                      removeDecorationFromFavourites
                    }
                    unFavouriteDecorationLoading={unFavouriteDecorationLoading}
                    favouriteDecorationLoading={favouriteDecorationLoading}
                  />
                ))}
              </div>
            ) : null}
            <>
              {decorationsByRating && decorationsByRating.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 my-8">
                  {decorationsByRating.map((decoration) => (
                    <DecorationCard
                      key={decoration.id}
                      decoration={decoration}
                      userFavourites={user?.favourites.map(
                        (favourite) => favourite.id
                      )}
                      addDecorationToFavourites={addDecorationsToFavourites}
                      removeDecorationFromFavourites={
                        removeDecorationFromFavourites
                      }
                      unFavouriteDecorationLoading={
                        unFavouriteDecorationLoading
                      }
                      favouriteDecorationLoading={favouriteDecorationLoading}
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
          <div className="fixed bottom-24 left-[41%] z-20">
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

      <div className="hidden sm:block">
        {showMap ? (
          <HomeMap
            setMapLoading={setMapLoading}
            userFavourites={user?.favourites}
          />
        ) : (
          <div className="px-32 overflow-y-auto py-24">
            {decorationsByCity && decorationsByCity.length > 0 ? (
              <div className="grid grid-cols-6 gap-x-10 gap-y-10 my-8">
                {decorationsByCity.map((decoration) => (
                  <DecorationCard
                    key={decoration.id}
                    decoration={decoration}
                    userFavourites={user?.favourites.map(
                      (favourite) => favourite.id
                    )}
                    addDecorationToFavourites={addDecorationsToFavourites}
                    removeDecorationFromFavourites={
                      removeDecorationFromFavourites
                    }
                    unFavouriteDecorationLoading={unFavouriteDecorationLoading}
                    favouriteDecorationLoading={favouriteDecorationLoading}
                  />
                ))}
              </div>
            ) : null}
            <>
              {decorationsByRating && decorationsByRating.length > 0 ? (
                <div className="grid grid-cols-6 gap-x-6 gap-y-10 my-8">
                  {decorationsByRating.map((decoration) => (
                    <DecorationCard
                      key={decoration.id}
                      decoration={decoration}
                      userFavourites={user?.favourites.map(
                        (favourite) => favourite.id
                      )}
                      addDecorationToFavourites={addDecorationsToFavourites}
                      removeDecorationFromFavourites={
                        removeDecorationFromFavourites
                      }
                      unFavouriteDecorationLoading={
                        unFavouriteDecorationLoading
                      }
                      favouriteDecorationLoading={favouriteDecorationLoading}
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
