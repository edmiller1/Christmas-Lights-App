import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration, DecorationImage } from "@/lib/types";
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Star,
  X,
} from "@phosphor-icons/react";
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
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
  userFavourites: string[] | undefined;
}

export const PopupCard = ({
  activeDecoration,
  setActiveDecoration,
  setActiveDecorationIndex,
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
    setActiveDecorationIndex(0);
  };

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden block">
        <div className="flex w-full h-96 absolute bottom-5 left-2 right-2 rounded-xl z-50">
          <div className="w-1/3">
            <img src={currentImage?.url} alt="Christmas decoration" />
          </div>
          <div className="w-2/3"></div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div
          className="w-[327px] flex flex-col mt-3 visible bg-white rounded-xl z-[99]"
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
            className="overflow-hidden rounded-tr-xl rounded-tl-xl relative"
            onMouseOver={showArrows}
            onMouseLeave={hideArrows}
          >
            <div
              className="flex transition-transform ease-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {activeDecoration?.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  className="decoration-card-image object-cover object-center w-72 h-52"
                />
              ))}
            </div>

            <div className="absolute inset-0 flex justify-between p-4 z-10">
              <div role="button" onClick={closePopup}>
                <X
                  size={28}
                  weight="bold"
                  color="#FFFFFF"
                  className="bg-black opacity-80 rounded-full p-1 hover:opacity-100"
                />
              </div>
            </div>
            {!showLeftArrow ? null : (
              <div className="absolute left-5 top-[45%] z-10">
                <button
                  onClick={prevImage}
                  className="p-1 rounded-full shadow bg-white/80 text-gray-800 focus:outline-none hover:bg-white transition-all"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
              </div>
            )}
            {showRightArrow ? (
              <div className="absolute right-5 top-[45%] z-10">
                <button
                  onClick={nextImage}
                  className="p-1 rounded-full shadow bg-white/90 text-gray-800 focus:outline-none hover:bg-white transition-all"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            ) : null}

            {activeDecoration && activeDecoration.images.length > 1 ? (
              <div className="absolute bottom-4 right-0 left-0">
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
          <div className="bg-white text-black px-4 py-1 rounded-br-xl rounded-bl-xl">
            <div className="flex items-center justify-between">
              <span className="mt-1 font-bold text-[1.01rem]">
                {activeDecoration?.name}
              </span>
              <div className="flex items-center space-x-1 mt-1 text-[1.01rem]">
                <Star size={20} weight="fill" color="#000000" />
                <span className="text-black">{activeDecoration?.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {activeDecoration?.city}, {activeDecoration?.country}
              </span>
              <div className="mt-1 p-1 bg-ch-red opacity-80 rounded-full hover:opacity-100 transition-all">
                <Link
                  to={`/decoration/${activeDecoration?.id}`}
                  target="_blank"
                >
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    color="#000000"
                    className="more-arrow"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
