import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateUID, getBase64Value } from "@/lib/helpers";
import { Get_Decoration } from "@/graphql/queries/getDecoration/types";
import { EditDetailsModal, EditImagesModal } from "..";

interface Props {
  isEditOpen: boolean;
  setIsEditOpen: (isEditOpen: boolean) => void;
  decorationImages: { id: string; url: string }[] | undefined;
  userPremium: boolean | undefined;
  decoration: Get_Decoration | null;
  updateDecoration: (
    id: string,
    address: string,
    city: string,
    country: string,
    deletedImages: { id: string; url: string }[],
    latitude: number,
    longitude: number,
    name: string,
    newImages: string[],
    region: string
  ) => void;
  editDecorationLoading: boolean;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const EditDecorationModal = ({
  isEditOpen,
  setIsEditOpen,
  decorationImages,
  userPremium,
  decoration,
  updateDecoration,
  editDecorationLoading,
  currentStep,
  setCurrentStep,
}: Props) => {
  const { toast } = useToast();
  const [countryAbbrev, setCountryAbbrev] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<{
    id: string;
    url: string;
  }>(decorationImages![0]);
  const [images, setImages] = useState<
    { id: string; url: string }[] | undefined
  >(decorationImages);
  const [files, setFiles] = useState<File[] | number[]>(
    Array(decoration?.images.length).fill(1)
  );
  const [deletedImages, setDeletedImages] = useState<
    { id: string; url: string }[]
  >([]);

  const [isRemoveImageOpen, setIsRemoveImageOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const handleImageSelect = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const imagesArray: { id: string; url: string }[] = [];
    const filesArray: File[] = [];
    const base64Array: string[] = [];

    if (
      (userPremium && images && images?.length > 8) ||
      (userPremium && Array.from(e.target.files).length > 8)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
      return;
    } else if (
      (!userPremium && images && images.length > 6) ||
      (!userPremium && Array.from(e.target.files).length > 6)
    ) {
      const countCopy = count + 1;
      if (countCopy % 3 === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "You can only upload a maximum of 6 images. Upgrade to premium to upload larger/more files",
        });
        setCount(countCopy);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You can only upload a maximum of 6 images",
        });
      }
      return;
    }

    //@ts-ignore
    Object.values(e.target.files).forEach((item: any, index: number) => {
      if (!e.target.files[index].type.includes("image")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Uploads must be of type image",
        });
      } else if (userPremium && e.target.files[index].size > 4194304) {
        //toast invalid file size
        const countCopy = count + 1;
        if (countCopy % 3 === 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "Images must be 4MB or less. Upgrade to premium to upload larger/more files",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Images must be 4MB or less",
          });
        }

        setCount(countCopy);
      } else if (userPremium && e.target.files[index].size > 6291456) {
        //toast invalid file size
        toast({
          variant: "destructive",
          title: "Error",
          description: "Images must be 6MB or less",
        });
      } else {
        const image = {
          id: generateUID(),
          url: URL.createObjectURL(e.target.files[index]),
        };
        getBase64Value(e.target.files[index], (imageBase64Value: string) => {
          base64Array.push(imageBase64Value);
        });
        filesArray.push(e.target.files[index]);
        imagesArray.push(image);
      }
    });

    const imagesCopy = [...images!];
    console.log(imagesCopy.concat(imagesArray));
    setImages(imagesCopy.concat(imagesArray));
    const filesCopy = [...(files as File[])];
    console.log(filesCopy.concat(filesArray));
    setFiles(filesCopy.concat(filesArray));
    setCurrentImage(imagesArray[imagesArray.length - 1]);
  };

  const removeImage = (id: string | undefined) => {
    const imagesCopy = [...images!];
    const deletedImagesCopy = [...deletedImages];
    const filesCopy = [...(files as File[])];

    const selectedIndex = imagesCopy.findIndex((image) => image.id === id);
    const selectedImage = imagesCopy.find((image) => image.id === id);

    if (selectedImage?.id.includes("CLA_Assets")) {
      deletedImagesCopy.push(selectedImage);
    }
    imagesCopy.splice(selectedIndex, 1);
    filesCopy.splice(selectedIndex, 1);

    setCurrentImage(imagesCopy[0]);
    setImages(imagesCopy);
    setFiles(filesCopy as File[]);
    setDeletedImages(
      deletedImagesCopy.map((image) => {
        return { id: image.id, url: image.url };
      })
    );
  };

  const nextImage = () => {
    if (currentImage && images) {
      const currentImageIndex = images.indexOf(currentImage);
      if (currentImageIndex === images.length - 1) {
        setCurrentImage(images[0]);
      } else {
        setCurrentImage(images[currentImageIndex + 1]);
      }
    }
  };

  const prevImage = () => {
    if (currentImage && images) {
      const currentImageIndex = images.indexOf(currentImage);
      if (currentImageIndex === 0) {
        setCurrentImage(images[images.length - 1]);
      } else {
        setCurrentImage(images[currentImageIndex - 1]);
      }
    }
  };

  const getCountryAbbrev = async (latitude: string, longitude: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mbApiKey}`
    );
    const jsonData = await response.json();
    const country = jsonData.features.find((item: any) =>
      item.id.includes("country")
    );
    setCountryAbbrev(country.properties.short_code);
  };

  useEffect(() => {
    if (
      localStorage.getItem("latitude") !== null &&
      localStorage.getItem("longitude") !== null
    ) {
      getCountryAbbrev(
        localStorage.getItem("latitude")!,
        localStorage.getItem("longitude")!
      );
    }
  }, []);

  const discardEdits = () => {
    setImages(decorationImages);
    setFiles([]);
    setDeletedImages([]);
    setCurrentImage({ id: "", url: "" });
    setCurrentStep(1);
    setIsCancelOpen(false);
    setIsEditOpen(false);
  };

  if (currentStep === 2) {
    return (
      <EditDetailsModal
        isEditOpen={isEditOpen}
        setIsCancelOpen={setIsCancelOpen}
        setIsEditOpen={setIsEditOpen}
        isCancelOpen={isCancelOpen}
        discardEdits={discardEdits}
        setCurrentStep={setCurrentStep}
        deletedImages={deletedImages}
        decoration={decoration}
        updateDecoration={updateDecoration}
        editDecorationLoading={editDecorationLoading}
        files={files}
        countryAbbrev={countryAbbrev}
      />
    );
  }

  return (
    <EditImagesModal
      isEditOpen={isEditOpen}
      setIsEditOpen={setIsEditOpen}
      currentImage={currentImage}
      setCurrentStep={setCurrentStep}
      images={images}
      nextImage={nextImage}
      prevImage={prevImage}
      removeImage={removeImage}
      isRemoveImageOpen={isRemoveImageOpen}
      setIsRemoveImageOpen={setIsRemoveImageOpen}
      userPremium={userPremium}
      isCancelOpen={isCancelOpen}
      setIsCancelOpen={setIsCancelOpen}
      discardEdits={discardEdits}
      handleImageSelect={handleImageSelect}
    />
  );
};
