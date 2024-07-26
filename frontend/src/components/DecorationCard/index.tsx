import { useState } from "react";
import { useMutation } from "@apollo/client";
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
import { Get_Decorations_By_City } from "@/graphql/queries/getDecorationsByCity/types";
import { DecorationImage } from "@/lib/types";
import {
  CaretLeft,
  CaretRight,
  CircleNotch,
  Heart,
  Star,
} from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { Get_Decorations_By_Rating } from "@/graphql/queries/getDecorationsByRating/types";
import { Search_For_Decorations } from "@/graphql/queries/searchForDecorations/types";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Props {
  index: number;
  isAuthenticated: boolean;
  decoration: Get_Decorations_By_City | Search_For_Decorations;
  decorations:
    | Get_Decorations_By_City[]
    | Get_Decorations_By_Rating[]
    | Search_For_Decorations[];
  userFavourites: string[] | undefined;
  refetchUserData: () => void;
}

export const DecorationCard = ({
  index,
  isAuthenticated,
  decoration,
  decorations,
  userFavourites,
  refetchUserData,
}: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<DecorationImage>(
    decoration.images[0]
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentDecorationIndex, setCurrentDecorationIndex] =
    useState<number>(0);

  //MUTATIONS
  const [favouriteDecoration, { loading: favouriteDecorationLoading }] =
    useMutation<FavouriteDecorationData, FavouriteDecorationArgs>(
      FAVOURITE_DECORATION,
      {
        onCompleted: () => {
          toast({
            title: "Success 🎉",
            description: "Decoration added to favourites ❤️",
          });
          refetchUserData();
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
            title: "Success 🎉",
            description: "Decoration removed from favourites 💔",
          });
          refetchUserData();
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

  const addDecorationToFavourites = (decorationId: string) => {
    if (isAuthenticated) {
      const decorationIndex = decorations.findIndex(
        (decoration) => decoration.id === decorationId
      );
      setCurrentDecorationIndex(decorationIndex);
      favouriteDecoration({ variables: { input: { id: decorationId } } });
    } else {
      toast({
        variant: "default",
        title: "Not currently signed in.",
        description: "Create an account to like decorations.",
        action: (
          <ToastAction altText="Sign Up" onClick={() => navigate("/signin")}>
            Sign Up
          </ToastAction>
        ),
      });
    }
  };

  const removeDecorationFromFavourites = (decorationId: string) => {
    const decorationIndex = decorations.findIndex(
      (decoration) => decoration.id === decorationId
    );
    setCurrentDecorationIndex(decorationIndex);
    unFavouriteDecoration({ variables: { input: { id: decorationId } } });
  };

  const nextImage = () => {
    const currentImageIndex = decoration.images.indexOf(currentImage);
    if (currentImageIndex === decoration.images.length - 1) {
      setCurrentImage(decoration.images[0]);
      setCurrentIndex(0);
    } else {
      setCurrentImage(decoration.images[currentImageIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    const currentImageIndex = decoration.images.indexOf(currentImage);
    if (currentImageIndex === 0) {
      setCurrentImage(decoration.images[0]);
      setCurrentIndex(0);
    } else {
      setCurrentImage(decoration.images[currentImageIndex - 1]);
      setCurrentIndex(currentImageIndex - 1);
    }
  };

  const showArrows = () => {
    if (currentIndex === 0) {
      setShowRightArrow(true);
    } else if (currentIndex === decoration.images.length - 1) {
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(true);
      setShowRightArrow(true);
    }
  };

  const hideArrows = () => {
    setShowLeftArrow(false);
    setShowRightArrow(false);
  };

  return (
    <>
      {/* Mobile */}
      <div className="block group sm:hidden">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {decoration.images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                className="object-cover decoration-card-image w-72 h-80"
              />
            ))}
          </div>
          <Link to={`/decoration/${decoration.id}`}>
            <div className="absolute inset-0 flex items-start justify-end p-2"></div>
          </Link>

          <div className="absolute z-10 top-2 right-2">
            {userFavourites?.includes(decoration.id) ? (
              <>
                {unFavouriteDecorationLoading &&
                currentDecorationIndex === index ? (
                  <CircleNotch
                    size={32}
                    weight="bold"
                    color="#000000"
                    className="animate-spin"
                  />
                ) : (
                  <button
                    onClick={() =>
                      removeDecorationFromFavourites(decoration.id)
                    }
                    disabled={
                      unFavouriteDecorationLoading || favouriteDecorationLoading
                    }
                  >
                    <Heart size={32} weight="fill" color="#FF647F" />
                  </button>
                )}
              </>
            ) : (
              <>
                {favouriteDecorationLoading &&
                currentDecorationIndex === index ? (
                  <CircleNotch
                    size={32}
                    weight="bold"
                    color="#000000"
                    className="animate-spin"
                  />
                ) : (
                  <button
                    onClick={() => addDecorationToFavourites(decoration.id)}
                    disabled={
                      unFavouriteDecorationLoading || favouriteDecorationLoading
                    }
                  >
                    <Heart size={32} weight="duotone" color="#FFFFFF" />
                  </button>
                )}
              </>
            )}
          </div>
          {currentIndex === 0 ? null : (
            <div className="absolute left-5 top-[45%] z-10">
              <button
                onClick={prevImage}
                className="p-1 text-gray-800 rounded-full shadow bg-white/80 focus:outline-none hover:bg-white"
              >
                <CaretLeft size={24} />
              </button>
            </div>
          )}
          {decoration.images.length > 1 ? (
            <div className="absolute right-5 top-[45%] z-10">
              <button
                onClick={nextImage}
                className="p-1 text-gray-800 rounded-full shadow bg-white/80 focus:outline-none hover:bg-white"
              >
                <CaretRight size={24} />
              </button>
            </div>
          ) : null}

          {decoration.images.length > 1 ? (
            <div className="absolute left-0 right-0 bottom-4">
              <div className="flex items-center justify-center gap-2">
                {decoration.images.map((_, i) => (
                  <div
                    key={i}
                    className={`
              transition-all w-2 h-2 bg-white rounded-full
              ${currentIndex === i ? "p-1.5" : "bg-opacity-50"}
            `}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <span className="mt-2 font-bold">{decoration.name}</span>
          <div className="flex items-center mt-3 space-x-1">
            <Star
              size={16}
              weight="fill"
              className="text-ch-dark dark:text-ch-light"
            />
            <span>{decoration.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 dark:text-zinc-400">
            {decoration.city}, {decoration.country}
          </span>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden cursor-pointer sm:group sm:block">
        <div
          className="relative w-64 h-64 overflow-hidden rounded-xl"
          onMouseOver={showArrows}
          onMouseLeave={hideArrows}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {decoration.images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                className="object-cover decoration-card-image h-80 w-80"
              />
            ))}
          </div>
          <Link to={`/decoration/${decoration.id}`}>
            <div className="absolute inset-0 flex items-start justify-end p-2"></div>
          </Link>
          <div className="absolute z-10 top-2 right-2">
            {userFavourites?.includes(decoration.id) ? (
              <>
                {unFavouriteDecorationLoading &&
                currentDecorationIndex === index ? (
                  <CircleNotch
                    size={32}
                    weight="bold"
                    color="#FFFFFF"
                    className="animate-spin"
                  />
                ) : (
                  <button
                    onClick={() =>
                      removeDecorationFromFavourites(decoration.id)
                    }
                    disabled={
                      unFavouriteDecorationLoading || favouriteDecorationLoading
                    }
                  >
                    <Heart size={28} weight="fill" color="#FF647F" />
                  </button>
                )}
              </>
            ) : (
              <>
                {favouriteDecorationLoading &&
                currentDecorationIndex === index ? (
                  <CircleNotch
                    size={32}
                    weight="bold"
                    color="#FFFFFF"
                    className="animate-spin"
                  />
                ) : (
                  <button
                    onClick={() => addDecorationToFavourites(decoration.id)}
                    disabled={
                      unFavouriteDecorationLoading || favouriteDecorationLoading
                    }
                  >
                    <Heart size={28} weight="duotone" color="#FFFFFF" />
                  </button>
                )}
              </>
            )}
          </div>
          {!showLeftArrow ? null : (
            <div className="absolute left-5 top-[45%] z-10">
              <button
                onClick={prevImage}
                className="p-1 text-gray-800 rounded-full shadow bg-white/80 focus:outline-none hover:bg-white"
              >
                <CaretLeft size={16} />
              </button>
            </div>
          )}

          {showRightArrow ? (
            <div className="absolute right-5 top-[45%] z-10">
              <button
                onClick={nextImage}
                className="p-1 text-gray-800 rounded-full shadow bg-white/80 focus:outline-none hover:bg-white"
              >
                <CaretRight size={16} />
              </button>
            </div>
          ) : null}

          {decoration.images.length > 1 ? (
            <div className="absolute left-0 right-0 bottom-2">
              <div className="flex items-center justify-center gap-2">
                {decoration.images.map((_, i) => (
                  <div
                    key={i}
                    className={`
              transition-all w-1 h-1 bg-white rounded-full
              ${currentIndex === i ? "p-1" : "bg-opacity-50"}
            `}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between w-64">
          <span className="mt-2 font-semibold">{decoration.name}</span>
          <div className="flex items-center mt-1 space-x-1">
            <Star
              size={16}
              weight="fill"
              className="text-ch-dark dark:text-ch-light"
            />
            <span>
              {decoration.rating.toFixed(1) === "0.0"
                ? "New"
                : decoration.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-400 dark:text-zinc-400">
          {decoration.city}, {decoration.country}
        </span>
      </div>
    </>
  );
};
