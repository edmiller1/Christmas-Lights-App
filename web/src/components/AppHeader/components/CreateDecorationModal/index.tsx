import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DECORATION } from "@/graphql/mutations/createDecoration";
import {
  CreateDecoration as CreateDecorationData,
  CreateDecorationArgs,
} from "@/graphql/mutations/createDecoration/types";
import { generateUID, getBase64Value } from "@/lib/helpers";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useToast } from "@/components/ui/use-toast";
import { DetailsModal, ImagesModal, UploadModal } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
  user: Get_User | null;
}

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const CreateDecorationModal = ({
  isCreateOpen,
  setIsCreateOpen,
  user,
}: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countryAbbrev, setCountryAbbrev] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const [showRemove, setShowRemove] = useState<boolean>(false);
  const [showArrows, setShowArrows] = useState<boolean>(false);

  const [images, setImages] = useState<Array<{ id: string; url: string }>>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentImage, setCurrentImage] = useState<{
    id: string;
    url: string;
  }>();
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [isRemoveImageOpen, setIsRemoveImageOpen] = useState<boolean>(false);

  const [
    createDecoration,
    { loading: createDecorationLoading, reset: createDecorationReset },
  ] = useMutation<CreateDecorationData, CreateDecorationArgs>(
    CREATE_DECORATION,
    {
      onCompleted(data) {
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Decoration created successfully!",
        });
        setIsCreateOpen(false);
        setTimeout(() => {
          navigate(`/decoration/${data?.createDecoration.id}`);
        }, 2000);
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Oh oh!",
          description: `Failed to create decoration. ${error}`,
        });
        console.log(error);
        createDecorationReset();
      },
    }
  );

  useEffect(() => {
    const imagesCopy = [...images];
    const filesCopy = [...files];
    if (!user?.premium && images.length > 6) {
      imagesCopy.forEach((image) => {
        if (imagesCopy.length > 6) {
          imagesCopy.pop();
          filesCopy.pop();
        }
      });
      setImages(imagesCopy);
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 6 images",
      });
    } else if (user?.premium && images.length > 8) {
      imagesCopy.forEach((image) => {
        if (imagesCopy.length > 8) {
          imagesCopy.pop();
          filesCopy.pop();
        }
      });

      setImages(imagesCopy);
      setFiles(filesCopy);
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
    }
  }, [images]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const imagesArray: { id: string; url: string }[] = [];
    const filesArray: File[] = [];

    if (
      (user?.premium && images.length > 8) ||
      (user?.premium && Array.from(e.dataTransfer.files).length > 8)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
      return;
    } else if (
      (!user?.premium && images.length > 6) ||
      (!user?.premium && Array.from(e.dataTransfer.files).length > 6)
    ) {
      const countCopy = count + 1;
      if (countCopy % 3 === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "You can only upload a maximum of 6 images. Upgrade to premium to upload larger/more files",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You can only upload a maximum of 6 images",
        });
      }
      return;
    }

    Object.values(e.dataTransfer.files).forEach((item: any, index: number) => {
      if (!e.dataTransfer.files[index].type.includes("image")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Uploads must be of type image",
        });
      } else if (!user?.premium && e.dataTransfer.files[index].size > 4194304) {
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
      } else if (user?.premium && e.dataTransfer.files[index].size > 6291456) {
        //toast invalid file size
        toast({
          variant: "destructive",
          title: "Error",
          description: "Images must be 6MB or less",
        });
      } else {
        const image = {
          id: generateUID(),
          url: URL.createObjectURL(e.dataTransfer.files[index]),
        };
        filesArray.push(e.dataTransfer.files[index]);

        imagesArray.push(image);
      }
    });
    const imagesCopy = [...images];
    setImages(imagesCopy.concat(imagesArray));
    const filesCopy = [...files];
    setFiles(filesCopy.concat(filesArray));

    setCurrentImage(imagesArray[imagesArray.length - 1]);
  };

  const handleImageSelect = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const imagesArray: { id: string; url: string }[] = [];
    const filesArray: File[] = [];
    const base64Array: string[] = [];

    if (
      (user?.premium && images.length > 8) ||
      (user?.premium && Array.from(e.target.files).length > 8)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
      return;
    } else if (
      (!user?.premium && images.length > 6) ||
      (!user?.premium && Array.from(e.target.files).length > 6)
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

    Object.values(e.target.files).forEach((item: any, index: number) => {
      if (!e.target.files[index].type.includes("image")) {
        //toast invlaid file type
        toast({
          variant: "destructive",
          title: "Error",
          description: "Uploads must be of type image",
        });
      } else if (!user?.premium && e.target.files[index].size > 4194304) {
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
      } else if (user?.premium && e.target.files[index].size > 6291456) {
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
        filesArray.push(e.target.files[index]);
        imagesArray.push(image);
      }
    });
    const imagesCopy = [...images];
    setImages(imagesCopy.concat(imagesArray));
    const filesCopy = [...files];
    setFiles(filesCopy.concat(filesArray));

    setCurrentImage(imagesArray[imagesArray.length - 1]);
  };

  const removeImage = async (id: string | undefined) => {
    const imagesCopy = [...images];
    const filesCopy = [...files];
    const selectedIndex = images.findIndex((image) => image.id === id);

    imagesCopy.splice(selectedIndex, 1);
    filesCopy.splice(selectedIndex, 1);
    setCurrentImage(imagesCopy[0]);
    setImages(imagesCopy);
    setFiles(filesCopy);
  };

  const nextImage = () => {
    if (currentImage) {
      const currentImageIndex = images.indexOf(currentImage);
      if (currentImageIndex === images.length - 1) {
        setCurrentImage(images[0]);
      } else {
        setCurrentImage(images[currentImageIndex + 1]);
      }
    }
  };

  const prevImage = () => {
    if (currentImage) {
      const currentImageIndex = images.indexOf(currentImage);
      if (currentImageIndex === 0) {
        setCurrentImage(images[images.length - 1]);
      } else {
        setCurrentImage(images[currentImageIndex - 1]);
      }
    }
  };

  const showImageTools = () => {
    if (images && images.length > 1) {
      setShowArrows(true);
    }
    setShowRemove(true);
  };

  const hideImageTools = () => {
    setShowArrows(false);
    setShowRemove(false);
  };

  const closeUploadModal = () => {
    if (images && images.length >= 1) {
      setIsCancelOpen(true);
    } else {
      setIsCreateOpen(false);
    }
  };

  const discardDecoration = async () => {
    setImages([]);
    setFiles([]);
    setCurrentImage(undefined);
    setIsCancelOpen(false);
    setCurrentStep(1);
  };

  const createNewDecoration = (
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    country: string,
    region: string,
    city: string,
    images: string[]
  ) => {
    createDecoration({
      variables: {
        input: {
          address,
          city,
          country,
          images,
          latitude,
          longitude,
          name,
          region,
        },
      },
    });
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

  if (currentStep === 2 && images.length > 0) {
    return (
      <ImagesModal
        isCreateOpen={isCreateOpen}
        isCancelOpen={isCancelOpen}
        setIsCancelOpen={setIsCancelOpen}
        setCurrentStep={setCurrentStep}
        images={images}
        currentImage={currentImage}
        discardDecoration={discardDecoration}
        removeImage={removeImage}
        nextImage={nextImage}
        prevImage={prevImage}
        showImageTools={showImageTools}
        hideImageTools={hideImageTools}
        showArrows={showArrows}
        showRemove={showRemove}
        isRemoveImageOpen={isRemoveImageOpen}
        setIsRemoveImageOpen={setIsRemoveImageOpen}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <DetailsModal
        discardDecoration={discardDecoration}
        files={files}
        images={images}
        isCancelOpen={isCancelOpen}
        isCreateOpen={isCreateOpen}
        setCurrentStep={setCurrentStep}
        setIsCancelOpen={setIsCancelOpen}
        createNewDecoration={createNewDecoration}
        createDecorationLoading={createDecorationLoading}
        countryAbbrev={countryAbbrev}
      />
    );
  }

  return (
    <UploadModal
      isCreateOpen={isCreateOpen}
      setIsCreateOpen={setIsCreateOpen}
      isCancelOpen={isCancelOpen}
      setIsCancelOpen={setIsCancelOpen}
      setCurrentStep={setCurrentStep}
      discardDecoration={discardDecoration}
      closeUploadModal={closeUploadModal}
      images={images}
      user={user}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleImageSelect={handleImageSelect}
    />
  );
};
