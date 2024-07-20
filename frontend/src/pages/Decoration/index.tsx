import { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_DECORATION,
  GET_RECOMMENDED_DECORATIONS,
  GET_USER,
} from "@/graphql/queries";
import {
  ADD_DECORATION_TO_HISTORY,
  ADD_VIEW,
  DELETE_DECORATION,
  DELETE_RATING,
  EDIT_DECORATION,
  EDIT_RATING,
  FAVOURITE_DECORATION,
  RATE_DECORATION,
  REPORT_DECORATION,
  UNFAVOURITE_DECORATION,
} from "@/graphql/mutations";
import {
  GetDecoration as GetDecorationData,
  GetDecorationArgs,
} from "@/graphql/queries/getDecoration/types";
import { GetUser as GetUserData } from "@/graphql/queries/getUser/types";
import {
  GetRecommendedDecorations as GetRecommendedDecorationsData,
  GetRecommendedDecorationsArgs,
  Get_Recommended_Decorations,
} from "@/graphql/queries/getRecommendedDecorations/types";
import {
  AddDecorationToHistory as AddDecorationToHistoryData,
  AddDecorationToHistoryArgs,
} from "@/graphql/mutations/addDecorationToHistory/types";
import { useParams, useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  CircleWavyCheck,
  DotsThreeVertical,
  Pencil,
  Share,
  Star,
  Trash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  AddView as AddViewData,
  AddViewArgs,
} from "@/graphql/mutations/addView/types";
import {
  RateDecoration as RateDecorationData,
  RateDecorationArgs,
} from "@/graphql/mutations/rateDecoration/types";
import {
  EditRating as EditRatingData,
  EditRatingArgs,
} from "@/graphql/mutations/editRating/types";
import {
  DeleteRating as DeleteRatingData,
  DeleteRatingArgs,
} from "@/graphql/mutations/deleteRating/types";
import {
  DeleteDecoration as DeleteDecorationData,
  DeleteDecorationArgs,
} from "@/graphql/mutations/deleteDecoration/types";
import {
  EditDecoration as EditDecorationData,
  EditDecorationArgs,
} from "@/graphql/mutations/editDecoration/types";
import {
  FavouriteDecoration as FavouriteDecorationData,
  FavouriteDecorationArgs,
} from "@/graphql/mutations/favouriteDecoration/types";
import {
  UnfavouriteDecoration as UnfavouriteDecorationData,
  UnfavouriteDecorationArgs,
} from "@/graphql/mutations/unfavouriteDecoration/types";
import {
  ReportDecoration as ReportDecorationData,
  ReportDecorationArgs,
} from "@/graphql/mutations/reportDecoration/types";
import { NotFound } from "..";
import {
  DecorationLoading,
  DecorationMenu,
  DecorationRatings,
  DecorationUserMenu,
  DeleteDecorationModal,
  EditDecorationModal,
  FullImagesOverlay,
  HeartButton,
  ImagesGrid,
  ImagesOverlay,
  RateButton,
  RecommendedDecorations,
  ReportDecorationModal,
  SaveButton,
  ShareDecoration,
  ShareDecorationModal,
  VerifiedPopOver,
  VerifiedSection,
} from "./components";
import { AppHeaderLoading } from "@/components/AppHeader/components";
import { AppHeader, Footer, SEO } from "@/components";
import { ToastAction } from "@/components/ui/toast";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const Decoration = () => {
  const navigate = useNavigate();
  const { decorationId } = useParams();
  const { isAuthenticated, user } = useKindeAuth();
  const { toast } = useToast();
  const [recommendedDecorations, setRecommendedDecorations] =
    useState<Get_Recommended_Decorations[]>();

  //Mobile
  const [showRatings, setShowRatings] = useState<boolean>(false);

  //Desktop
  //@ts-ignore
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  //Both
  const [showImageOverlay, setShowImageOverlay] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<
    { id: string; url: string } | undefined
  >();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAddRatingOpen, setIsAddRatingOpen] = useState<boolean>(false);
  const [showFullImageOverlay, setShowFullImageOverlay] =
    useState<boolean>(false);
  const [currentOverlayImage, setCurrentOverlayImage] = useState<
    { id: string; url: string } | undefined
  >();
  const [isEditRatingOpen, setIsEditRatingOpen] = useState<boolean>(false);
  const [initialRating, setInitialRating] = useState<number | undefined>();
  const [initialRatingId, setInitialRatingId] = useState<string | undefined>();
  const [isDeleteRatingOpen, setIsDeleteRatingOpen] = useState<boolean>(false);
  const [isReportDecorationOpen, setIsReportDecorationOpen] =
    useState<boolean>(false);

  // QUERIES
  const {
    data: getUserData,
    loading: getUserLoading,
    refetch: getUserRefetch,
  } = useQuery<GetUserData>(GET_USER);

  const currentUser = getUserData?.getUser ? getUserData.getUser : null;

  const {
    data: getDecorationData,
    loading: getDecorationLoading,
    error: getDecorationError,
    refetch: getDecorationRefetch,
  } = useQuery<GetDecorationData, GetDecorationArgs>(GET_DECORATION, {
    variables: {
      input: { id: decorationId! },
    },
    onCompleted: (data) => {
      setCurrentImage(data.getDecoration.images[0]);
    },
  });

  const decoration = getDecorationData?.getDecoration
    ? getDecorationData?.getDecoration
    : null;

  const [
    getRecommendedDecorations,
    {
      loading: getRecommendedDecorationsLoading,
      error: getRecommendedDecorationsError,
    },
  ] = useLazyQuery<
    GetRecommendedDecorationsData,
    GetRecommendedDecorationsArgs
  >(GET_RECOMMENDED_DECORATIONS, {
    onCompleted: (data) => {
      setRecommendedDecorations(data.getRecommendedDecorations);
    },
  });

  //MUTATIONS
  const [addDecorationToHistory] = useMutation<
    AddDecorationToHistoryData,
    AddDecorationToHistoryArgs
  >(ADD_DECORATION_TO_HISTORY);

  const [addView] = useMutation<AddViewData, AddViewArgs>(ADD_VIEW);

  const [rateDecoration, { loading: rateDecorationLoading }] = useMutation<
    RateDecorationData,
    RateDecorationArgs
  >(RATE_DECORATION, {
    onCompleted() {
      toast({
        title: "Success 🎉",
        description: "Rating created successfully!",
      });
      setIsAddRatingOpen(false);
      setIsRatingModalOpen(false);
      setShowRatings(false);
      getUserRefetch({ input: { id: currentUser!.id } });
      getDecorationRefetch({ input: { id: decorationId! } });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to rate decoration. ${error}`,
      });
    },
  });

  const [editRating, { loading: editRatingLoading }] = useMutation<
    EditRatingData,
    EditRatingArgs
  >(EDIT_RATING, {
    onCompleted: (data) => {
      toast({
        title: "Success 🎉",
        description: "Rating updated successfully!",
      });
      setIsEditRatingOpen(false);
      setIsRatingModalOpen(false);
      getUserRefetch({ input: { id: data.editRating.id } });
      getDecorationRefetch({ input: { id: decorationId! } });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to update rating. ${error}`,
      });
    },
  });

  const [deleteRating, { loading: deleteRatingLoading }] = useMutation<
    DeleteRatingData,
    DeleteRatingArgs
  >(DELETE_RATING, {
    onCompleted(data) {
      toast({
        title: "Success 🎉",
        description: "Rating deleted successfully!",
      });
      setIsDeleteRatingOpen(false);
      setShowRatings(false);
      setIsRatingModalOpen(false);
      getUserRefetch({ input: { id: data.deleteRating.id } });
      getDecorationRefetch({ input: { id: decorationId! } });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to delete rating. ${error}`,
      });
    },
  });

  const [editDecoration, { loading: editDecorationLoading }] = useMutation<
    EditDecorationData,
    EditDecorationArgs
  >(EDIT_DECORATION, {
    onCompleted(data) {
      toast({
        title: "Success 🎉",
        description: "Decoration updated successfully!",
      });
      setCurrentImage(decoration?.images[0]);
      setIsEditOpen(false);
      getDecorationRefetch({ input: { id: data.editDecoration.id } });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to edit decoration. ${error}`,
      });
    },
  });

  const [favouriteDecoration, { loading: favouriteDecorationLoading }] =
    useMutation<FavouriteDecorationData, FavouriteDecorationArgs>(
      FAVOURITE_DECORATION,
      {
        onCompleted: (data) => {
          toast({
            title: "Success 🎉",
            description: "Decoration saved!",
          });
          getUserRefetch({ input: { id: data.favouriteDecoration.id } });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description: `Failed to save decoration. ${error}`,
          });
        },
      }
    );

  const [unfavouriteDecoration, { loading: unfavouriteDecorationLoading }] =
    useMutation<UnfavouriteDecorationData, UnfavouriteDecorationArgs>(
      UNFAVOURITE_DECORATION,
      {
        onCompleted: (data) => {
          toast({
            title: "Success 🎉",
            description: "Decoration removed from favourites!",
          });
          getUserRefetch({ input: { id: data.unfavouriteDecoration.id } });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Uh oh!",
            description: `Failed to unsave decoration. ${error}`,
          });
        },
      }
    );

  const [reportDecoration, { loading: reportDecorationLoading }] = useMutation<
    ReportDecorationData,
    ReportDecorationArgs
  >(REPORT_DECORATION, {
    onCompleted: () => {
      toast({
        title: "Success 🎉",
        description: "Thank you for your feedback!",
      });
      setIsReportDecorationOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to rate decoration. ${error}`,
      });
    },
  });

  const [deleteDecoration, { loading: deleteDecorationLoading }] = useMutation<
    DeleteDecorationData,
    DeleteDecorationArgs
  >(DELETE_DECORATION, {
    onCompleted: () => {
      toast({
        title: "Success 🎉",
        description: "Decoration was deleted successfully!",
      });
      setIsDeleteOpen(false);
      getUserRefetch();
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to delete decoration. Please try again. If problem persists reach out to support.`,
      });
    },
  });

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

  const updateDecoration = (
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
  ) => {
    editDecoration({
      variables: {
        input: {
          address,
          city,
          country,
          id,
          latitude,
          longitude,
          name,
          region,
          deletedImages,
          newImages,
        },
      },
    });
  };

  const addtoFavourites = () => {
    if (isAuthenticated && currentUser) {
      favouriteDecoration({ variables: { input: { id: decorationId! } } });
    } else {
      toast({
        variant: "default",
        title: "Not currently signed in.",
        description: "Create an account to like decorations.",
        action: (
          <ToastAction altText="Sign Up" onClick={() => navigate("/signin")}>
            Sign Up
          </ToastAction>
        ),
      });
    }
  };

  const removeFromFavourites = () => {
    unfavouriteDecoration({ variables: { input: { id: decorationId! } } });
  };

  const addRating = (rating: number) => {
    if (isAuthenticated && currentUser) {
      rateDecoration({
        variables: { input: { id: decorationId, rating: rating } },
      });
    } else {
      toast({
        variant: "default",
        title: "Not currently signed in.",
        description: "Create an account to like decorations.",
        action: (
          <ToastAction altText="Sign Up" onClick={() => navigate("/signin")}>
            Sign Up
          </ToastAction>
        ),
      });
    }
  };

  const updateRating = (rating: number | undefined) => {
    editRating({
      variables: { input: { id: initialRatingId!, rating: rating! } },
    });
  };

  const removeRating = () => {
    deleteRating({ variables: { input: { id: initialRatingId! } } });
  };

  const reportCurrentDecoration = (
    reportOptions: string[],
    additionalDetails: string | undefined
  ) => {
    reportDecoration({
      variables: {
        input: {
          id: decorationId!,
          reportOptions: reportOptions,
          additionalDetails: additionalDetails,
        },
      },
    });
  };

  const deleteUserDecoration = (decorationId: string) => {
    deleteDecoration({ variables: { input: { decorationId: decorationId } } });
  };

  useEffect(() => {
    if (decoration) {
      addView({
        variables: {
          input: { id: decorationId, numViews: decoration?.num_views },
        },
      });
      addDecorationToHistory({ variables: { input: { id: decoration.id } } });
    }
  }, [decorationId]);

  useEffect(() => {
    if (decoration?.creator_id !== user?.id) {
      const rating = currentUser?.ratings.find(
        (rating) => rating.decoration_id === decorationId
      );
      setInitialRating(rating?.rating);
      setInitialRatingId(rating?.id);
    }
  }, [getUserData]);

  useEffect(() => {
    if (decoration) {
      getRecommendedDecorations({
        variables: { input: { city: decoration.city, id: decoration.id } },
      });
    }
  }, [decoration?.id]);

  if (getDecorationError) {
    return <NotFound />;
  }

  if (getDecorationLoading) {
    return <DecorationLoading />;
  }

  if (currentUser && decoration) {
    if (!decoration?.verified && decoration.creator_id !== currentUser.id) {
      return <NotFound />;
    }
  } else if (!currentUser && decoration) {
    if (!decoration?.verified) {
      return <NotFound />;
    }
  }

  return (
    <>
      <SEO
        title={decoration?.name ?? ""}
        description="Christmas Decoration"
        name={decoration?.name ?? ""}
        type="Christmas Decoration"
      />
      {/* Mobile */}
      <div className="h-full overflow-y-auto sm:hidden">
        {showImageOverlay ? (
          <ImagesOverlay
            decorationImages={decoration?.images}
            setShowImageOverlay={setShowImageOverlay}
            setCurrentOverlayImage={setCurrentOverlayImage}
            setShowFullImageOverlay={setShowFullImageOverlay}
          />
        ) : null}
        {showRatings ? (
          <DecorationRatings
            setShowRatings={setShowRatings}
            rating={decoration?.rating}
            decorationId={decorationId}
            ratings={decoration?.ratings}
            numRatings={decoration?.ratings.length}
            userId={currentUser?.id}
            decorationUserId={decoration?.creator_id}
            isAddRatingOpen={isAddRatingOpen}
            setIsAddRatingOpen={setIsAddRatingOpen}
            addRating={addRating}
            rateDecorationLoading={rateDecorationLoading}
            editRatingLoading={editRatingLoading}
            initialRating={initialRating}
            isEditRatingOpen={isEditRatingOpen}
            setInitialrating={setInitialRating}
            setIsEditRatingOpen={setIsEditRatingOpen}
            updateRating={updateRating}
            isDeleteRatingOpen={isDeleteRatingOpen}
            setIsDeleteRatingOpen={setIsDeleteRatingOpen}
            removeRating={removeRating}
            deleteRatingLoading={deleteRatingLoading}
          />
        ) : null}
        <div className="relative">
          <button
            className="absolute px-1 py-1 bg-white rounded-full shadow-lg left-3 top-3"
            onClick={() => navigate(-1)}
          >
            <CaretLeft size={24} color="#000000" weight="bold" />
          </button>
          <HeartButton
            addToFavourites={addtoFavourites}
            currentUser={currentUser}
            decorationId={decorationId}
            favouriteDecorationLoading={favouriteDecorationLoading}
            removeFromFavourites={removeFromFavourites}
            unfavouriteDecorationLoading={unfavouriteDecorationLoading}
          />
          <ShareDecoration
            decorationImage={decoration?.images[0]}
            decorationName={decoration?.name}
            decorationCountry={decoration?.country}
            decorationCity={decoration?.city}
          />
          <div className="absolute px-3 py-1 text-xs rounded-full right-3 bottom-3 bg-zinc-800">
            {getImageIndex(currentImage?.id)} / {decoration?.images.length}
          </div>
          {decoration && decoration?.images.length > 1 ? (
            <>
              <button
                className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-white p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                onClick={prevImage}
              >
                <CaretLeft size={20} color="#000000" />
              </button>
              <button
                className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-white p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                onClick={nextImage}
              >
                <CaretRight size={20} color="#000000" />
              </button>
            </>
          ) : null}
          <img
            loading="lazy"
            src={currentImage?.url}
            alt="decoration image"
            className="object-cover w-full h-64"
            onClick={() => setShowImageOverlay(true)}
          />
        </div>
        <div className="py-3 pl-5 pr-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <h1 className="text-3xl font-semibold">{decoration?.name}</h1>
                {!decoration?.verified ? (
                  <CircleWavyCheck
                    size={24}
                    className="text-primary"
                    weight="fill"
                  />
                ) : null}
              </div>
            </div>
            {currentUser?.id === decoration?.creator_id ? (
              <div className="flex justify-end">
                <Drawer shouldScaleBackground modal={false}>
                  <DrawerTrigger asChild>
                    <DotsThreeVertical
                      size={28}
                      weight="bold"
                      className="float-right"
                    />
                  </DrawerTrigger>
                  <DrawerContent className="h-64 focus:outline-none">
                    <DrawerHeader className="flex justify-start">
                      <DrawerTitle>Decoration options</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col mx-4 rounded-lg bg-secondary">
                      <div
                        className="flex items-center p-3 space-x-2"
                        onClick={() => setIsEditOpen(true)}
                      >
                        <Pencil size={20} className="text-white" />
                        <span className="text-sm font-semibold">
                          Edit decoration
                        </span>
                      </div>
                      <Separator />
                      <div
                        className="flex items-center p-3 space-x-2"
                        onClick={() => setIsDeleteOpen(true)}
                      >
                        <Trash size={20} className="text-white" />
                        <span className="text-sm font-semibold">
                          Delete decoration
                        </span>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            ) : null}
            {user?.id !== decoration?.creator_id ? (
              <div className="flex justify-end">
                <DecorationMenu
                  setIsReportDecorationOpen={setIsReportDecorationOpen}
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center mt-2 space-x-1">
            <Star size={16} color="#ffffff" weight="fill" />
            <span>
              {decoration?.rating === 0 ? "New" : decoration?.rating.toFixed(1)}
            </span>
            &nbsp; &middot; &nbsp;
            <button
              role="button"
              className="underline"
              onClick={() => setShowRatings(true)}
            >
              {decoration?.ratings.length}{" "}
              {decoration?.ratings.length === 1 ? "rating" : "ratings"}
            </button>
            &nbsp; &middot; &nbsp;
            <span>
              {decoration?.views.length}{" "}
              {decoration?.views.length === 1 ? "view" : "views"}
            </span>
          </div>
          <div className="mt-2">
            <span>
              {decoration?.city}, {decoration?.country}
            </span>
          </div>
        </div>
        <Separator />
        {user?.id === decoration?.creator_id ? (
          <>
            <VerifiedSection
              verificationSubmitted={decoration?.verification_submitted}
              verified={decoration?.verified}
              decorationId={decorationId}
            />
          </>
        ) : null}
        <Separator />
        <div className="px-5 py-3 rounded-lg">
          <h3 className="text-lg">Location</h3>
          <span className="text-sm">{decoration?.address}</span>
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-village+bc1919(${
              decoration?.longitude
            },${decoration?.latitude})/${decoration?.longitude},${
              decoration?.latitude
            },15,0,0/600x350@2x?attribution=false&logo=false&access_token=${
              import.meta.env.VITE_MAPBOX_API_KEY
            }`}
            alt={`Mapbox map of ${decoration?.longitude},${decoration?.latitude}`}
            className="rounded-lg"
          />
        </div>
        <RecommendedDecorations
          recommendedDecorations={recommendedDecorations}
          getRecommendeddecorationsLoading={getRecommendedDecorationsLoading}
          getRecommendedDecorationsError={getRecommendedDecorationsError}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        {getUserLoading ? (
          <AppHeaderLoading />
        ) : (
          <AppHeader
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
        )}
        {showImageOverlay ? (
          <ImagesOverlay
            decorationImages={decoration?.images}
            setShowImageOverlay={setShowImageOverlay}
            setCurrentOverlayImage={setCurrentOverlayImage}
            setShowFullImageOverlay={setShowFullImageOverlay}
          />
        ) : null}
        <div className="flex flex-col pt-20 sm:mx-10 md:mx-16 lg:mx-32 xl:mx-52 2xl:mx-72">
          <h1 className="text-3xl font-semibold">{decoration?.name}</h1>
          <div className="flex items-center justify-between my-2 text-sm font-semibold">
            <div className="flex">
              <div className="flex items-center">
                <Star size={16} weight="fill" className="text-ch-light" />
                &nbsp;
                <span>
                  {decoration?.rating === 0
                    ? "New"
                    : decoration?.rating.toFixed(1)}
                </span>
                &nbsp; &middot; &nbsp;
                <span
                  className="underline cursor-pointer"
                  onClick={() => setIsRatingModalOpen(true)}
                >
                  {decoration?.ratings.length}{" "}
                  {decoration?.ratings.length === 1 ? "rating" : "ratings"}
                </span>
              </div>
              <span className="mx-2">|</span>
              <div className="flex items-center">
                &nbsp;
                <span>{decoration?.views.length}</span>
                &nbsp;views
              </div>
              <span className="mx-2">|</span>
              <span>
                {decoration?.city}, {decoration?.country}
              </span>
            </div>
            {currentUser?.id === decoration?.creator_id ? (
              <div className="flex mr-1">
                {user?.id === decoration?.creator_id ? (
                  <VerifiedPopOver
                    verificationSubmitted={decoration?.verification_submitted}
                    verified={decoration?.verified}
                    decorationId={decorationId}
                  />
                ) : null}
                <DecorationUserMenu
                  setIsEditOpen={setIsEditOpen}
                  setIsDeleteOpen={setIsDeleteOpen}
                />
              </div>
            ) : (
              <DecorationMenu
                setIsReportDecorationOpen={setIsReportDecorationOpen}
              />
            )}
          </div>
          {decoration?.images && decoration.images.length > 0 ? (
            <ImagesGrid
              decorationImages={decoration?.images}
              setShowImageOverlay={setShowImageOverlay}
            />
          ) : null}
          <div className="flex justify-end mt-2">
            <RateButton
              currentUser={currentUser}
              isAuthenticated={isAuthenticated}
              decorationId={decorationId}
              setIsRatingModalOpen={setIsRatingModalOpen}
            />
            <SaveButton
              currentUser={currentUser}
              decorationId={decorationId}
              addtoFavourites={addtoFavourites}
              removeFromFavourites={removeFromFavourites}
              favouriteDecorationLoading={favouriteDecorationLoading}
              unfavouriteDecorationLoading={unfavouriteDecorationLoading}
            />
            <Button variant="ghost" onClick={() => setIsShareModalOpen(true)}>
              <Share size={20} className="text-ch-dark dark:text-ch-light" />
              <span className="ml-2">Share</span>
            </Button>
          </div>
          <div className="mx-2 mt-5">
            <h2 className="text-2xl font-bold">Location</h2>
            <div className="flex items-center w-2/3">
              <h3 className="mr-2 text-base text-gray-600 dark:text-zinc-300">
                {decoration?.address}
              </h3>
              {decoration?.verified ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleWavyCheck
                        size={24}
                        color="#E23737"
                        weight="fill"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
            <div className="w-full h-full my-5 bg-gray-200 rounded-lg">
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-village+bc1919(${decoration?.longitude},${decoration?.latitude})/${decoration?.longitude},${decoration?.latitude},15,0/1120x500@2x?attribution=false&logo=false&access_token=pk.eyJ1Ijoic2hhbXB1cnJzIiwiYSI6ImNsZjdhcmJweDB5cGw0M212YnplaTFkNnkifQ.RRUvcHyfO7W0Pg4vOQ4UvA`}
                alt="static map"
                className="rounded-lg"
              />
            </div>
            <RecommendedDecorations
              recommendedDecorations={recommendedDecorations}
              getRecommendeddecorationsLoading={
                getRecommendedDecorationsLoading
              }
              getRecommendedDecorationsError={getRecommendedDecorationsError}
            />
          </div>
        </div>
        <Footer />
      </div>

      {/* Both */}
      <ReportDecorationModal
        isReportDecorationOpen={isReportDecorationOpen}
        reportDecorationLoading={reportDecorationLoading}
        setIsReportDecorationOpen={setIsReportDecorationOpen}
        reportCurrentDecoration={reportCurrentDecoration}
      />
      <EditDecorationModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        decorationImages={decoration?.images}
        decoration={decoration}
        updateDecoration={updateDecoration}
        editDecorationLoading={editDecorationLoading}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        userPremium={currentUser?.premium}
      />
      {showFullImageOverlay ? (
        <FullImagesOverlay
          currentImage={currentOverlayImage}
          setCurrentImage={setCurrentOverlayImage}
          decorationImages={decoration?.images}
          getImageIndex={getImageIndex}
          setShowImageOverlay={setShowImageOverlay}
          setShowFullImageOverlay={setShowFullImageOverlay}
        />
      ) : null}
      <ShareDecorationModal
        decorationCity={decoration?.city}
        decorationCountry={decoration?.country}
        decorationImage={decoration?.images[0]}
        decorationName={decoration?.name}
        isShareModalOpen={isShareModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
      />
      {decorationId ? (
        <DeleteDecorationModal
          deleteDecorationLoading={deleteDecorationLoading}
          deleteUserDecoration={deleteUserDecoration}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          decorationId={decorationId}
        />
      ) : null}
    </>
  );
};
