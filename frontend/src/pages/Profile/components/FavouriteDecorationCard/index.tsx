import { useMutation } from "@apollo/client";
import { UNFAVOURITE_DECORATION } from "@/graphql/mutations";
import {
  UnfavouriteDecoration as UnFavouriteDecorationData,
  UnfavouriteDecorationArgs,
} from "@/graphql/mutations/unfavouriteDecoration/types";
import { useToast } from "@/components/ui/use-toast";
import { CircleNotch, Heart, Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Decoration } from "@/lib/types";
import { useState } from "react";

interface Props {
  decoration: Decoration;
  decorations: Decoration[];
  index: number;
  refetchfavourites: () => void;
}

export const FavouriteDecorationCard = ({
  decoration,
  decorations,
  index,
  refetchfavourites,
}: Props) => {
  const { toast } = useToast();

  const [currentDecorationIndex, setCurrentDecorationIndex] =
    useState<number>(0);

  const [unFavouriteDecoration, { loading: unFavouriteDecorationLoading }] =
    useMutation<UnFavouriteDecorationData, UnfavouriteDecorationArgs>(
      UNFAVOURITE_DECORATION,
      {
        onCompleted: () => {
          toast({
            title: "Success 🎉",
            description: "Decoration removed from favourites!",
          });
          refetchfavourites();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error 😬",
            description:
              "Failed to remove decoration from favourites. Please try again.",
          });
        },
      }
    );

  const removeDecorationFromFavourites = (decorationId: string) => {
    const decorationIndex = decorations.findIndex(
      (decoration) => decoration.id === decorationId
    );
    setCurrentDecorationIndex(decorationIndex);
    unFavouriteDecoration({ variables: { input: { id: decorationId } } });
  };
  return (
    <>
      <div className="group sm:hidden">
        {unFavouriteDecorationLoading && currentDecorationIndex === index ? (
          <div className="relative w-full overflow-hidden rounded-xl">
            <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full space-y-3 rounded-xl bg-black/90">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <button
              className="absolute top-2 right-2"
              onClick={() => removeDecorationFromFavourites(decoration.id)}
            >
              <Heart size={36} weight="fill" className="text-ch-pink" />
            </button>
            <img
              src={decoration.images[0].url}
              alt="decoration image"
              className="object-cover object-center w-full h-80"
            />
          </div>
        ) : (
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-xl">
            <button
              className="absolute top-2 right-2"
              onClick={() => removeDecorationFromFavourites(decoration.id)}
            >
              <Heart size={36} weight="fill" className="text-ch-pink" />
            </button>
            <Link to={`/decoration/${decoration.id}`}>
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-full h-80"
              />
            </Link>
          </div>
        )}

        <Link to={`/decoration/${decoration.id}`}>
          <div className="flex items-center justify-between">
            <h3 className="mt-1 font-bold">{decoration.name}</h3>
            <div className="flex items-center mt-1 space-x-1">
              <Star size={16} className="text-ch-dark dark:text-ch-light" />
              <span>{decoration.rating}</span>
            </div>
          </div>
          <p className="text-sm">
            {decoration.city}, {decoration.country}
          </p>
        </Link>
      </div>

      <div className="hidden sm:block group">
        {unFavouriteDecorationLoading && currentDecorationIndex === index ? (
          <div className="relative w-64 overflow-hidden rounded-xl">
            <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full space-y-3 rounded-xl bg-black/90">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <button
              className="absolute top-2 right-2"
              onClick={() => removeDecorationFromFavourites(decoration.id)}
            >
              <Heart size={36} weight="fill" className="text-ch-pink" />
            </button>
            <img
              src={decoration.images[0].url}
              alt="decoration image"
              className="object-cover object-center w-64 h-64"
            />
          </div>
        ) : (
          <div className="relative w-64 overflow-hidden bg-gray-200 rounded-xl">
            <button
              className="absolute top-2 right-2"
              onClick={() => removeDecorationFromFavourites(decoration.id)}
            >
              <Heart size={36} weight="fill" className="text-ch-pink" />
            </button>
            <Link
              to={`/decoration/${decoration.id}`}
              key={decoration.id}
              target="_blank"
            >
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-64 h-64"
              />
            </Link>
          </div>
        )}
        <Link
          to={`/decoration/${decoration.id}`}
          key={decoration.id}
          target="_blank"
        >
          <div className="flex items-center justify-between">
            <h3 className="mt-4 font-bold">{decoration.name}</h3>
            <div className="flex items-center mt-3 space-x-1">
              <Star
                size={16}
                weight="fill"
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="">{decoration.rating}</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {decoration.city}, {decoration.country}
          </p>
        </Link>
      </div>
    </>
  );
};
