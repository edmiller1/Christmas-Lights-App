import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { DecorationImage } from "@/lib/types";
import { CaretLeft, CaretRight, Heart, Star, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country
    | undefined;
  setActiveDecoration: (
    activeDecoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Region
      | Get_Decorations_Via_Country
      | undefined
  ) => void;
  userFavourites: string[] | undefined;
}

export const PopupCard = ({
  activeDecoration,
  setActiveDecoration,
  userFavourites,
}: Props) => {
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<DecorationImage | undefined>(
    activeDecoration?.images[0]
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextImage = () => {
    const currentImageIndex = activeDecoration?.images.indexOf(currentImage!);
    if (
      activeDecoration &&
      currentImageIndex === activeDecoration.images.length - 1
    ) {
      setCurrentImage(activeDecoration.images[0]);
      setCurrentIndex(0);
    } else {
      setCurrentImage(activeDecoration?.images[currentImageIndex! + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    const currentImageIndex = activeDecoration?.images.indexOf(currentImage!);
    if (currentImageIndex === 0) {
      setCurrentImage(
        activeDecoration?.images[activeDecoration.images.length - 1]
      );
      setCurrentIndex(activeDecoration!.images.length - 1);
    } else {
      setCurrentImage(activeDecoration?.images[currentImageIndex! - 1]);
      setCurrentIndex(currentImageIndex! - 1);
    }
  };

  const showArrows = () => {
    if (currentIndex === 0) {
      setShowRightArrow(true);
    } else if (
      activeDecoration &&
      currentIndex === activeDecoration?.images.length - 1
    ) {
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

  const closePopup = () => {
    setActiveDecoration(undefined);
  };

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <div className="w-72 flex mt-5 ml-16 visible bg-white rounded-lg z-[99]">
          <div className="relative w-1/3">
            <div
              role="button"
              className="absolute left-1 top-1"
              onClick={closePopup}
            >
              <X
                size={16}
                weight="bold"
                color="#FFFFFF"
                className="p-1 bg-black rounded-full opacity-80 hover:opacity-100"
              />
            </div>
            <img
              src={currentImage?.url}
              alt="Christmas decoration"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-2/3 px-2">
            <div className="flex justify-between">
              <div className="flex flex-col text-xs">
                <span className="mt-1 font-bold text-black">
                  {activeDecoration?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {activeDecoration?.city}, {activeDecoration?.country}
                </span>
              </div>
              <div className="mt-1">
                {activeDecoration &&
                userFavourites?.includes(activeDecoration?.id) ? (
                  <Heart size={16} weight="fill" color="#FF647F" />
                ) : (
                  <Heart size={16} weight="bold" color="#000000" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs">
                <Star size={12} weight="fill" color="#000000" />
                <span className="text-xs text-black">
                  {activeDecoration?.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div
          className="w-[327px] flex flex-col mt-3 ml-10 visible bg-white rounded-xl z-[99]"
          onMouseOver={() => {
            setShowRightArrow(true);
            setShowLeftArrow(true);
          }}
          onMouseLeave={() => {
            setShowRightArrow(false);
            setShowLeftArrow(false);
          }}
        >
          <div
            className="relative overflow-hidden rounded-tr-xl rounded-tl-xl"
            onMouseOver={showArrows}
            onMouseLeave={hideArrows}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {activeDecoration?.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  className="object-cover object-center decoration-card-image w-72 h-52"
                />
              ))}
            </div>

            <Link to={`/decoration/${activeDecoration?.id}`}>
              <div className="absolute inset-0 z-10 flex items-start justify-end p-2 cursor-pointer"></div>
            </Link>

            <div className="absolute z-10 flex top-2 right-2">
              {activeDecoration &&
              userFavourites?.includes(activeDecoration?.id) ? (
                <Heart size={24} weight="fill" color="#FF647F" />
              ) : (
                <Heart size={24} weight="duotone" color="#FFFFFF" />
              )}
            </div>
            <div
              role="button"
              onClick={closePopup}
              className="absolute z-10 flex top-2 left-2"
            >
              <X
                size={28}
                weight="bold"
                color="#FFFFFF"
                className="p-1 bg-black rounded-full opacity-80 hover:opacity-100"
              />
            </div>
            {!showLeftArrow ? null : (
              <div className="absolute left-5 top-[45%] z-10">
                <button
                  onClick={prevImage}
                  className="p-1 text-gray-800 transition-all rounded-full shadow bg-white/80 focus:outline-none hover:bg-white"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
              </div>
            )}
            {showRightArrow ? (
              <div className="absolute right-5 top-[45%] z-10">
                <button
                  onClick={nextImage}
                  className="p-1 text-gray-800 transition-all rounded-full shadow bg-white/90 focus:outline-none hover:bg-white"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            ) : null}

            {activeDecoration && activeDecoration.images.length > 1 ? (
              <div className="absolute left-0 right-0 bottom-4">
                <div className="flex items-center justify-center gap-2">
                  {activeDecoration.images.map((_, i) => (
                    <div
                      key={i}
                      className={`
              transition-all w-2 h-2 bg-white rounded-full
              ${currentIndex === i ? "p-1" : "bg-opacity-50"}
            `}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="px-4 py-3 text-black bg-white rounded-br-xl rounded-bl-xl">
            <div className="flex items-center justify-between">
              <span className="mt-1 font-bold text-[1.01rem]">
                {activeDecoration?.name}
              </span>
              <div className="flex items-center space-x-1 mt-1 text-[1.01rem]">
                <Star size={20} weight="fill" color="#000000" />
                <span className="text-black">{activeDecoration?.rating}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {activeDecoration?.city}, {activeDecoration?.country}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
