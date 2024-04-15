import { cloudinary } from "../../lib/cloudinary";
import {
  AdvancedImage,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from "@cloudinary/react";

interface Props {
  currentImage: { id: string; url: string } | undefined;
  setShowImageOverlay: (showImageOverlay: boolean) => void;
}

export const CloudinaryImage = ({
  currentImage,
  setShowImageOverlay,
}: Props) => {
  const image = cloudinary.image(currentImage?.id);

  image.format("auto").quality("auto");
  return (
    <div
      className="h-32 w-full object-cover"
      onClick={() => setShowImageOverlay(true)}
    >
      <AdvancedImage
        cldImg={image}
        plugins={[lazyload(), responsive(), accessibility(), placeholder()]}
      />
    </div>
  );
};
