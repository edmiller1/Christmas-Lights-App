import { Button } from "@/components/ui/button";
import { DotsNine } from "@phosphor-icons/react";

interface Props {
  decorationImages: { id: string; url: string }[] | undefined;
  setShowImageOverlay: (showImageOverlay: boolean) => void;
}

export const ImagesGrid = ({
  decorationImages,
  setShowImageOverlay,
}: Props) => {
  if (decorationImages && decorationImages?.length === 1) {
    return (
      <div className="image-grid-1">
        <img
          src={decorationImages[0].url}
          alt="Christmas Decoration"
          className="image-grd-col-2 image-grid-row-2 rounded-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
      </div>
    );
  }

  if (decorationImages && decorationImages?.length === 2) {
    return (
      <div className="image-grid-2">
        <img
          src={decorationImages[0].url}
          alt="Christmas Decoration"
          className="w-1/2 h-[500px] rounded-tl-xl rounded-bl-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
        <img
          src={decorationImages[1].url}
          alt="Christmas decoration"
          className="w-1/2 h-[500px] rounded-tr-xl rounded-br-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
      </div>
    );
  }

  if (
    (decorationImages && decorationImages?.length === 3) ||
    decorationImages?.length === 4
  ) {
    return (
      <div className="image-grid-3">
        <img
          src={decorationImages[0].url}
          alt="Christmas decoration"
          className="image-grid-col-2 image-grid-row-2 rounded-tl-xl rounded-bl-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
        <img
          src={decorationImages[1].url}
          alt="Christmas Decoration"
          className="rounded-tr-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
        <img
          src={decorationImages[2].url}
          alt="Christmas Decoration"
          className="rounded-br-xl cursor-pointer"
          onClick={() => setShowImageOverlay(true)}
        />
        <div className="absolute sm:bottom-48 sm:right-72 lg:right-[26%] xl:right-[22%] z-10">
          <Button variant="outline" onClick={() => setShowImageOverlay(true)}>
            <DotsNine
              size={28}
              className="mr-3 text-ch-dark dark:text-ch-light"
              weight="bold"
            />
            Show all photos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="image-grid-4">
      {decorationImages && decorationImages.length > 0 ? (
        <>
          <img
            src={decorationImages[0].url}
            alt="Christmas decoration"
            className="image-grid-col-2 image-grid-row-2 rounded-tl-xl rounded-bl-xl cursor-pointer"
            onClick={() => setShowImageOverlay(true)}
          />
          <img
            src={decorationImages[1].url}
            alt="Christmas Decoration"
            className="cursor-pointer"
            onClick={() => setShowImageOverlay(true)}
          />

          <img
            src={decorationImages[2].url}
            alt="Christmas Decoration"
            className="rounded-tr-xl cursor-pointer"
            onClick={() => setShowImageOverlay(true)}
          />
          <img
            src={decorationImages[3].url}
            alt="Christmas Decoration"
            onClick={() => setShowImageOverlay(true)}
          />
          <img
            src={decorationImages[4].url}
            alt="Christmas Decoration"
            className="rounded-br-xl cursor-pointer"
            onClick={() => setShowImageOverlay(true)}
          />
        </>
      ) : null}
      <div className="absolute sm:bottom-10 right-[22%] 2xl:bottom-40 z-10">
        <Button variant="outline" onClick={() => setShowImageOverlay(true)}>
          <DotsNine
            size={28}
            className="mr-3 text-ch-dark dark:text-ch-light"
            weight="bold"
          />
          Show all photos
        </Button>
      </div>
    </div>
  );
};
