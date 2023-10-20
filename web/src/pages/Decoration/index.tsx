import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DECORATION } from "@/graphql/queries/getDecoration";
import {
  GetDecoration as GetDecorationData,
  GetDecorationArgs,
} from "@/graphql/queries/getDecoration/types";
import { NotFound } from "..";
import { useParams } from "react-router-dom";
import { DecorationLoading } from "./components";
import {
  CaretLeft,
  CaretRight,
  Heart,
  Share,
  Star,
} from "@phosphor-icons/react";

export const Decoration = () => {
  const { decorationId } = useParams();

  const {
    data: getDecorationData,
    loading: getDecorationLoading,
    error: getDecorationError,
  } = useQuery<GetDecorationData, GetDecorationArgs>(GET_DECORATION, {
    variables: { input: { id: decorationId! } },
    onCompleted: (data) => {
      setCurrentImage(data.getDecoration.images[0]);
    },
  });

  const decoration = getDecorationData?.getDecoration
    ? getDecorationData?.getDecoration
    : null;

  const [currentImage, setCurrentImage] = useState<
    { id: string; url: string } | undefined
  >();

  const getImageIndex = (id: string | undefined) => {
    const index = decoration?.images.findIndex((image) => image.id === id);
    return index! + 1;
  };

  const nextImage = () => {
    if (currentImage && decoration) {
      const currentImageIndex = decoration.images.indexOf(currentImage);
      if (currentImageIndex === decoration.images.length - 1) {
        setCurrentImage(decoration.images[0]);
      } else {
        setCurrentImage(decoration.images[currentImageIndex + 1]);
      }
    }
  };

  const prevImage = () => {
    if (currentImage && decoration) {
      const currentImageIndex = decoration.images.indexOf(currentImage);
      if (currentImageIndex === 0) {
        setCurrentImage(decoration.images[decoration.images.length - 1]);
      } else {
        setCurrentImage(decoration.images[currentImageIndex - 1]);
      }
    }
  };

  if (getDecorationError) {
    return <NotFound />;
  }

  if (getDecorationLoading) {
    return <DecorationLoading />;
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div
          role="button"
          className="absolute left-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
        >
          <CaretLeft size={24} color="#000000" weight="bold" />
        </div>
        <div
          role="button"
          className="absolute right-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
        >
          <Heart size={24} color="#000000" weight="bold" />
        </div>
        <div
          role="button"
          className="absolute right-16 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
        >
          <Share size={24} color="#000000" weight="bold" />
        </div>
        <div className="absolute right-3 bottom-3 px-3 py-1 text-xs bg-zinc-800 rounded-full">
          {getImageIndex(currentImage?.id)} / {decoration?.images.length}
        </div>
        {decoration && decoration?.images.length > 1 ? (
          <>
            <div
              role="button"
              className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
              onClick={prevImage}
            >
              <CaretLeft size={20} color="#FFFFFF" />
            </div>
            <div
              className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
              onClick={nextImage}
            >
              <CaretRight size={20} color="#FFFFFF" />
            </div>
          </>
        ) : null}
        <img
          loading="lazy"
          src={currentImage?.url}
          alt="decoration image"
          className="h-64 w-full object-cover bg-ch-turquoise"
        />
      </div>
      <div className="px-5 py-5">
        <h1 className="font-semibold text-3xl">{decoration?.name}</h1>
        <div className="flex items-center space-x-1 mt-2">
          <Star size={16} color="#ffffff" weight="fill" />
          <span>
            {decoration?.rating === 0 ? "New" : decoration?.rating.toFixed(1)}
          </span>
          &nbsp; &middot; &nbsp;
          <span className="underline">
            {decoration?.numRatings === null ? "0" : decoration?.numRatings}{" "}
            {decoration?.numRatings === 1 ? "rating" : "ratings"}
          </span>
          &nbsp; &middot; &nbsp;
          <span>
            {decoration?.numViews === null ? 0 : decoration?.numViews} views
          </span>
        </div>
        <div className="mt-2">
          <span>
            {decoration?.city}, {decoration?.country}
          </span>
        </div>
      </div>
    </div>
  );
};
