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
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "@/graphql/queries/getUser/types";
import {
  GetRecommendedDecorations as GetRecommendedDecorationsData,
  GetRecommendedDecorationsArgs,
  Get_Recommended_Decorations,
} from "@/graphql/queries/getRecommendedDecorations/types";
import {
  AddDecorationToHistory as AddDecorationToHistoryData,
  AddDecorationToHistoryArgs,
} from "@/graphql/mutations/addDecorationToHistory/types";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  CircleNotch,
  CircleWavyCheck,
  Heart,
  Share,
  Star,
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
  VerifiedPopOver,
  VerifiedSection,
} from "./components";
import {
  AdvancedImage,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from "@cloudinary/react";
import { AppHeaderLoading } from "@/components/AppHeader/components";
import { AppHeader, Footer } from "@/components";

export const Decoration = () => {
  const navigate = useNavigate();
  const { decorationId } = useParams();
  const { isAuthenticated, user } = useKindeAuth();
  const { toast } = useToast();
  const [recommendedDecorations, setRecommendedDecorations] =
    useState<Get_Recommended_Decorations[]>();

  //Mobile
  const [showRatings, setShowRatings] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  //Desktop
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  //Both
  const [showImageOverlay, setShowImageOverlay] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
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
  } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: user?.id ? user.id : "" } },
  });

  const currentUser = getUserData?.getUser ? getUserData.getUser : null;

  const {
    data: getDecorationData,
    loading: getDecorationLoading,
    error: getDecorationError,
    refetch: getDecorationRefetch,
  } = useQuery<GetDecorationData, GetDecorationArgs>(GET_DECORATION, {
    variables: { input: { id: decorationId! } },
    onCompleted: (data) => {
      setCurrentImage(data.getDecoration.images[0]);
    },
  });

  const decoration = getDecorationData?.getDecoration
    ? getDecorationData?.getDecoration
    : null;

  const [
    getRecommendedDecorations,
    { loading: getRecommendedDecorationsLoading },
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
    favouriteDecoration({ variables: { input: { id: decorationId! } } });
  };

  const removeFromFavourites = () => {
    unfavouriteDecoration({ variables: { input: { id: decorationId! } } });
  };

  const addRating = (rating: number) => {
    rateDecoration({
      variables: { input: { id: decorationId, rating: rating } },
    });
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

  useEffect(() => {
    if (decoration) {
      addView({
        variables: {
          input: { id: decorationId, numViews: decoration?.num_views },
        },
      });
      addDecorationToHistory({ variables: { input: { id: decoration.id } } });
    }
  }, [decoration?.id]);

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

  if (!decoration?.verified) {
    return <NotFound />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="overflow-y-auto h-[70rem] sm:hidden">
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
        {showShareOptions ? (
          <ShareDecoration
            setShowShareOptions={setShowShareOptions}
            decorationImage={decoration?.images[0]}
            decorationName={decoration?.name}
            decorationCountry={decoration?.country}
            decorationCity={decoration?.city}
          />
        ) : null}
        <div className="relative">
          <button
            className="absolute left-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
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
          <button
            className="absolute right-16 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
            onClick={() => setShowShareOptions(true)}
          >
            <Share size={24} color="#000000" weight="bold" />
          </button>
          <div className="absolute right-3 bottom-3 px-3 py-1 text-xs bg-zinc-800 rounded-full">
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
            className="h-64 w-full object-cover bg-ch-turquoise"
            onClick={() => setShowImageOverlay(true)}
          />
        </div>
        <div className="px-5 py-3">
          <div className="flex items-center justofy-between space-x-2">
            <div className="flex items-center space-x-2">
              <h1 className="font-semibold text-3xl">{decoration?.name}</h1>
              {decoration?.verified ? (
                <CircleWavyCheck
                  size={24}
                  className="text-primary"
                  weight="fill"
                />
              ) : null}
            </div>
            {user?.id !== decoration?.creator_id ? (
              <div className="flex justify-end">
                <DecorationMenu
                  setIsReportDecorationOpen={setIsReportDecorationOpen}
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-1 mt-2">
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
            <span>{decoration?.views.length} views</span>
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
        />
        {/* Bottom nav */}
        {user?.id === decoration?.creator_id ? (
          <div className="fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between dark:bg-zinc-900 dark:border-t dark:border-black">
            <div>
              <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
                Edit
              </Button>
            </div>
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ) : null}
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
        <div className="flex flex-col mx-72 pt-20 2xl:mx-96">
          <h1 className="text-3xl font-semibold">{decoration?.name}</h1>
          <div className="flex justify-between items-center font-semibold text-sm my-2">
            <div className="flex">
              <div className="flex items-center">
                <Star size={16} weight="fill" className="text-ch-light" />
                &nbsp;
                <span>{decoration?.rating.toFixed(1)}</span>
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
              <div className="mr-1 flex">
                {!decoration?.verified &&
                !decoration?.verification_submitted ? (
                  <VerifiedPopOver decorationId={decorationId} />
                ) : null}
                <DecorationUserMenu setIsEditOpen={setIsEditOpen} />
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
              isAuthenticated={isAuthenticated}
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
          <div className="mt-5 mx-2">
            <h2 className="text-2xl font-bold">Location</h2>
            <div className="w-2/3 flex items-center">
              <h3 className="text-base mr-2 text-gray-600 dark:text-zinc-300">
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
            <div className="my-5 h-[26rem] w-full bg-gray-200 rounded-lg">
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
        userPremium={currentUser?.premium}
        decoration={decoration}
        updateDecoration={updateDecoration}
        editDecorationLoading={editDecorationLoading}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
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
    </>
  );
};
