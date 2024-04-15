import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface Props {
  setShowImageOverlay: (showImageOverlay: boolean) => void;
  setShowFullImageOverlay: (showFullImageOverlay: boolean) => void;
  decorationImages: { id: string; url: string }[] | undefined;
  currentImage: { id: string; url: string } | undefined;
  setCurrentImage: (currentImage: { id: string; url: string }) => void;
  getImageIndex: (id: string | undefined) => number;
}

export const FullImagesOverlay = ({
  setShowImageOverlay,
  decorationImages,
  currentImage,
  getImageIndex,
  setCurrentImage,
  setShowFullImageOverlay,
}: Props) => {
  const prevImage = () => {
    if (currentImage && decorationImages) {
      const currentImageIndex = decorationImages.indexOf(currentImage);
      if (currentImageIndex === 0) {
        setCurrentImage(decorationImages[decorationImages.length - 1]);
      } else {
        setCurrentImage(decorationImages[currentImageIndex - 1]);
      }
    }
  };

  const nextImage = () => {
    if (currentImage && decorationImages) {
      const currentImageIndex = decorationImages.indexOf(currentImage);
      if (currentImageIndex === decorationImages.length - 1) {
        setCurrentImage(decorationImages[0]);
      } else {
        setCurrentImage(decorationImages[currentImageIndex + 1]);
      }
    }
  };

  const closeOverlays = () => {
    setShowFullImageOverlay(false);
    setShowImageOverlay(false);
  };
  return (
    <>
      {/* Mobile */}
      <motion.div
        className="sticky top-0 overflow-y-auto w-full h-screen z-50 bg-black sm:hidden"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="w-full">
          <div className="px-5 py-5 h-16 flex justify-between">
            <Button variant="ghost">
              <CaretLeft
                size={24}
                weight="bold"
                color="#FFFFFF"
                onClick={closeOverlays}
              />
            </Button>

            <span>
              {getImageIndex(currentImage?.id)} / {decorationImages?.length}
            </span>
            <div></div>
          </div>

          <div className="relative min-h-[80vh] flex items-center justify-center">
            <button
              className="animate-fade-in absolute left-5 top-1/2 cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
              onClick={prevImage}
            >
              <CaretLeft size={32} weight="bold" color="#FFFFFF" />
            </button>
            <button
              className="animate-fade-in absolute right-5 top-1/2 cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
              onClick={nextImage}
            >
              <CaretRight size={32} color="#FFFFFF" />
            </button>
            <img
              src={currentImage?.url}
              alt="Christmas Decoration"
              className="w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Desktop */}
      <motion.div
        className="hidden bg-black sm:block sm:overflow-y-auto sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:top-0 sm:w-full sm:h-screen sm:z-50"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="w-full">
          <div className="px-5 py-5 h-16 flex justify-between rounded-full">
            <button>
              <CaretLeft
                size={24}
                weight="bold"
                color="#FFFFFF"
                onClick={closeOverlays}
              />
            </button>

            <span>
              {getImageIndex(currentImage?.id)} / {decorationImages?.length}
            </span>
            <div></div>
          </div>

          <div className="relative min-h-[80vh] flex items-center justify-center">
            <button
              className="animate-fade-in ml-32 border border-white absolute left-5 top-1/2 cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:bg-gray-600"
              onClick={prevImage}
            >
              <CaretLeft size={32} weight="bold" color="#FFFFFF" />
            </button>
            <button
              className="animate-fade-in mr-32 border-white border absolute right-5 top-1/2 cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:bg-gray-600"
              onClick={nextImage}
            >
              <CaretRight size={32} color="#FFFFFF" />
            </button>
            <div className="mx-96">
              <img
                src={currentImage?.url}
                alt="Christmas Decoration"
                className="w-full h-[40rem] object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
