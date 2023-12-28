import { Get_Decorations_By_City } from "@/graphql/queries/getDecorationsByCity/types";
import { DecorationImage } from "@/lib/types";
import { NetworkStatus } from "@apollo/client";
import {
  CaretLeft,
  CaretRight,
  CircleNotch,
  Heart,
  Star,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  decoration: Get_Decorations_By_City;
  userFavourites: string[] | undefined;
  addDecorationToFavourites: (decorationId: string) => void;
  removeDecorationFromFavourites: (decorationId: string) => void;
  unFavouriteDecorationLoading: boolean;
  favouriteDecorationLoading: boolean;
  getUserNetworkStatus: NetworkStatus;
}

export const DecorationCard = ({
  decoration,
  userFavourites,
  addDecorationToFavourites,
  removeDecorationFromFavourites,
  unFavouriteDecorationLoading,
  favouriteDecorationLoading,
  getUserNetworkStatus,
}: Props) => {
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<DecorationImage>(
    decoration.images[0]
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  return (
    <>
      <div className="group sm:hidden">
        <div className="overflow-hidden h-96 object-center rounded-xl relative">
          <Link to={`/decoration/${decoration.id}`}>
            <div
              className="flex object-top transition-transform ease-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {decoration.images.map((image) => (
                <img src={image.url} className="" />
              ))}
            </div>
          </Link>
          <div className="absolute inset-0 flex items-start justify-end p-2">
            {userFavourites?.includes(decoration.id) ? (
              <>
                {unFavouriteDecorationLoading ||
                getUserNetworkStatus === NetworkStatus.refetch ? (
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
                {favouriteDecorationLoading ||
                getUserNetworkStatus === NetworkStatus.refetch ? (
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
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 focus:outline-none hover:bg-white"
              >
                <CaretLeft size={24} />
              </button>
            </div>
          )}
          <div className="absolute right-5 top-[45%] z-10">
            <button
              onClick={nextImage}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 focus:outline-none hover:bg-white"
            >
              <CaretRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {decoration.images.map((_, i) => (
                <div
                  className={`
              transition-all w-2 h-2 bg-white rounded-full
              ${currentIndex === i ? "p-1.5" : "bg-opacity-50"}
            `}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="mt-4 font-bold">{decoration.name}</span>
          <div className="flex items-center space-x-1 mt-3">
            <Star
              size={16}
              weight="fill"
              className="text-ch-dark dark:text-ch-light"
            />
            <span className="">{decoration.rating}</span>
          </div>
        </div>
        <span className="text-sm text-gray-400 dark:text-zinc-400">
          {decoration.city}, {decoration.country}
        </span>
      </div>

      <div className="hidden sm:group sm:block">
        <div className="w-full h-3/5">
          <img
            src={decoration.images[0].url}
            alt="Christmas Decoration"
            className="h-64 w-full rounded-xl shadow-lg object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="mt-4 font-bold">{decoration.name}</span>
          <div className="flex items-center space-x-1 mt-3">
            <Star
              size={16}
              weight="fill"
              className="text-ch-dark dark:text-ch-light"
            />
            <span className="">{decoration.rating}</span>
          </div>
        </div>
        <span className="text-sm text-gray-400 dark:text-zinc-400">
          {decoration.city}, {decoration.country}
        </span>
      </div>
    </>
  );
};
