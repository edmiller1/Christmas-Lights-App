import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DECORATION } from "@/graphql/mutations/createDecoration";
import {
  CreateDecoration as CreateDecorationData,
  CreateDecorationArgs,
} from "@/graphql/mutations/createDecoration/types";
import { generateUID } from "@/lib/helpers";
import { Get_User } from "@/graphql/queries/getUser/types";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ImagesModal, UploadModal } from "..";

interface Props {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
  currentUser: Get_User | undefined;
}

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const CreateDecorationModal = ({
  currentUser,
  isCreateOpen,
  setIsCreateOpen,
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

  useEffect(() => {
    const imagesCopy = [...images];
    const filesCopy = [...files];
    if (!currentUser?.premium && images.length > 6) {
      //@ts-ignore
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
    } else if (currentUser?.premium && images.length > 8) {
      //@ts-ignore
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
      (currentUser?.premium && images.length > 8) ||
      (currentUser?.premium && Array.from(e.dataTransfer.files).length > 8)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
      return;
    } else if (
      (!currentUser?.premium && images.length > 6) ||
      (!currentUser?.premium && Array.from(e.dataTransfer.files).length > 6)
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

    //@ts-ignore
    Object.values(e.dataTransfer.files).forEach((item: any, index: number) => {
      if (!e.dataTransfer.files[index].type.includes("image")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Uploads must be of type image",
        });
      } else if (
        !currentUser?.premium &&
        e.dataTransfer.files[index].size > 4194304
      ) {
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
      } else if (
        currentUser?.premium &&
        e.dataTransfer.files[index].size > 6291456
      ) {
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

    if (
      (currentUser?.premium && images.length > 8) ||
      (currentUser?.premium && Array.from(e.target.files).length > 8)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload a maximum of 8 images",
      });
      return;
    } else if (
      (!currentUser?.premium && images.length > 6) ||
      (!currentUser?.premium && Array.from(e.target.files).length > 6)
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
        //toast invlaid file type
        toast({
          variant: "destructive",
          title: "Error",
          description: "Uploads must be of type image",
        });
      } else if (
        !currentUser?.premium &&
        e.target.files[index].size > 4194304
      ) {
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
      } else if (currentUser?.premium && e.target.files[index].size > 6291456) {
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

  const removeImage = (id: string | undefined) => {
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

  if (currentStep === 2 && images.length > 0) {
    return (
      <ImagesModal
        currentImage={currentImage}
        discardDecoration={discardDecoration}
        hideImageTools={hideImageTools}
        images={images}
        isCancelOpen={isCancelOpen}
        isCreateOpen={isCreateOpen}
        isRemoveImageOpen={isRemoveImageOpen}
        nextImage={nextImage}
        prevImage={prevImage}
        removeImage={removeImage}
        setCurrentStep={setCurrentStep}
        setIsCancelOpen={setIsCancelOpen}
        setIsRemoveImageOpen={setIsRemoveImageOpen}
        showArrows={showArrows}
        showImageTools={showImageTools}
        showRemove={showRemove}
      />
    );
  }

  if (currentStep === 3) {
    return <></>;
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
      currentUser={currentUser}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleImageSelect={handleImageSelect}
    />
  );
};
