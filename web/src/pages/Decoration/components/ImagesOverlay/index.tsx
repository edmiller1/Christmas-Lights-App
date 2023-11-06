import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CaretLeft, Heart, Share } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";
import { FullImagesOverlay } from "..";

interface Props {
  setShowImageOverlay: (showImageOverlay: boolean) => void;
  decorationImages: { id: string; url: string }[] | undefined;
  setCurrentOverlayImage: (
    currentOverlyaImage: { id: string; url: string } | undefined
  ) => void;
  setShowFullImageOverlay: (showFullImageOverlay: boolean) => void;
}

export const ImagesOverlay = ({
  decorationImages,
  setShowImageOverlay,
  setCurrentOverlayImage,
  setShowFullImageOverlay,
}: Props) => {
  const selectImage = (image: { id: string; url: string }) => {
    setShowImageOverlay(false);
    setCurrentOverlayImage(image);
    setShowFullImageOverlay(true);
  };
  return (
    <>
      {/* Mobile */}
      <motion.div
        className="sticky top-0 overflow-y-auto w-full h-screen z-40 bg-ch-light dark:bg-ch-dark sm:hidden"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="w-full">
          <div className="px-5 py-5 h-16">
            <CaretLeft
              size={24}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
              onClick={() => setShowImageOverlay(false)}
            />
          </div>
          {decorationImages ? (
            <div
              className="px-3"
              onClick={() => selectImage(decorationImages[0])}
            >
              <img
                src={decorationImages[0].url}
                alt="Christmas Decoration"
                className="h-64 w-full rounded-xl object-cover"
              />
            </div>
          ) : null}
          <div className="gap-4 grid grid-cols-2 mt-5 px-3">
            {decorationImages
              ?.filter((image, index) => index !== 0)
              .map((image, i) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt="Christmas Decoration"
                  className={`${
                    i % 2 === 0
                      ? "aspect-square w-full object-cover rounded-xl"
                      : i % 4 === 0
                      ? "h-auto object-cover rounded-xl max-w-full"
                      : "aspect-video w-full object-cover rounded-xl"
                  }`}
                  onClick={() => selectImage(image)}
                />
              ))}
          </div>
        </div>
      </motion.div>

      {/* Desktop */}
      <motion.div
        className="sm:block sm:overflow-y-auto sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:top-0 sm:w-full sm:h-screen sm:z-50 bg-ch-light dark:bg-ch-dark"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="w-full">
          <div className="sticky top-0 flex justify-between items-center px-5 py-5 h-16 bg-ch-light dark:bg-ch-dark">
            <Button variant="ghost">
              <CaretLeft
                size={28}
                weight="bold"
                className="text-ch-dark dark:text-ch-light"
                onClick={() => setShowImageOverlay(false)}
              />
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="ghost">
                <Share
                  size={20}
                  weight="bold"
                  className="mr-1 text-ch-dark dark:text-ch-light"
                  onClick={() => setShowImageOverlay(false)}
                />
                <span>Share</span>
              </Button>
              <Button variant="ghost">
                <Heart
                  size={20}
                  weight="bold"
                  className="mr-1 text-ch-dark dark:text-ch-light"
                  onClick={() => setShowImageOverlay(false)}
                />
                <span>Save</span>
              </Button>
            </div>
          </div>
          <div className="mx-72 mt-10 2xl:mx-[34rem]">
            {decorationImages ? (
              <img
                src={decorationImages[0].url}
                alt="Christmas Decoration"
                className="h-96 w-full rounded-xl object-cover cursor-pointer"
                onClick={() => selectImage(decorationImages[0])}
              />
            ) : null}
            <div className="mt-5 gap-5 columns-2 mb-8">
              {decorationImages
                ?.filter((image, index) => index !== 0)
                .map((image, i) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt="Christmas Decoration"
                    className={`${
                      i % 2 === 0
                        ? "aspect-square w-full object-cover rounded-xl mb-5 cursor-pointer"
                        : i % 4 === 0
                        ? "h-auto object-cover rounded-xl max-w-full mb-5 cursor-pointer"
                        : "aspect-video w-full object-cover rounded-xl mb-5 cursor-pointer"
                    }`}
                    onClick={() => selectImage(image)}
                  />
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
