import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_DECORATIONS_VIA_CITY,
  GET_DECORATIONS_VIA_COUNTRY,
  GET_DECORATIONS_VIA_REGION,
  GET_USER,
} from "@/graphql/queries";
import {
  FAVOURITE_DECORATION,
  CREATE_ROUTE,
  UNFAVOURITE_DECORATION,
} from "@/graphql/mutations";
import {
  GetDecorationsViaCity as GetDecorationsViaCityData,
  GetDecorationsViaCityArgs,
  Get_Decorations_Via_City,
} from "@/graphql/queries/getDecorationsViaCity/types";
import {
  GetDecorationsViaCountry as GetDecorationsViaCountryData,
  GetDecorationsViaCountryArgs,
  Get_Decorations_Via_Country,
} from "@/graphql/queries/getDecorationsViaCountry/types";
import {
  GetDecorationsViaRegion as GetDecorationsViaRegionData,
  GetDecorationsViaRegionArgs,
  Get_Decorations_Via_Region,
} from "@/graphql/queries/getDecorationsViaRegion/types";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "@/graphql/queries/getUser/types";
import {
  FavouriteDecoration as FavouriteDecorationData,
  FavouriteDecorationArgs,
} from "@/graphql/mutations/favouriteDecoration/types";
import {
  UnfavouriteDecoration as UnfavouriteDecorationData,
  UnfavouriteDecorationArgs,
} from "@/graphql/mutations/unfavouriteDecoration/types";
import {
  CreateRoute as CreateRouteData,
  CreateRouteArgs,
} from "@/graphql/mutations/createRoute/types";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  CaretLeft,
  ClockCounterClockwise,
  Heart,
  MapPin,
  MapTrifold,
  UserCircle,
} from "@phosphor-icons/react";
import {
  CreateRouteModal,
  DecorationPopup,
  RouteMap,
  SecondaryNav,
} from "./components";
import { MenuItems, ThemeToggle } from "@/components/AppHeader/components";
import { useUserData } from "@/lib/hooks";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Decoration, ViewState } from "@/lib/types";
import { MapRef } from "react-map-gl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastAction } from "@/components/ui/toast";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const initialViewState = {
  latitude: localStorage.getItem("latitude")
    ? localStorage.getItem("latitude")
    : -40.8536,
  longitude: localStorage.getItem("longitude")
    ? localStorage.getItem("longitude")
    : 155.4537,
  zoom: localStorage.getItem("latitude") ? 6 : 4,
  bearing: 0,
  pitch: 0,
};

export const RoutePlanning = () => {
  const { toast } = useToast();
  const currentUser = useUserData();
  const navigate = useNavigate();
  const mapRef = useRef<MapRef>();

  const [isCreateRouteOpen, setIsCreateRouteOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("map");
  const [decorations, setDecorations] = useState<
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | null
  >(null);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [activeDecoration, setActiveDecoration] = useState<
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
  >();
  const [activeDecorationIndex, setActiveDecorationIndex] = useState<number>(0);

  const refs = decorations?.reduce((acc: any, value: any) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const {
    data: getUserData,
    loading: getUserLoading,
    refetch: refetchUser,
  } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: currentUser?.uid ? currentUser.uid : "" } },
  });

  const [
    getDecorationsViaCountry,
    { loading: getDecorationsViaCountryLoading },
  ] = useLazyQuery<GetDecorationsViaCountryData, GetDecorationsViaCountryArgs>(
    GET_DECORATIONS_VIA_COUNTRY,
    {
      onCompleted: (data) => {
        setDecorations(data.getDecorationsViaCountry);
      },
    }
  );

  const [getDecorationsViaCity, { loading: getDecorationsViaCityLoading }] =
    useLazyQuery<GetDecorationsViaCityData, GetDecorationsViaCityArgs>(
      GET_DECORATIONS_VIA_CITY,
      {
        onCompleted: (data) => {
          setDecorations(data.getDecorationsViaCity);
        },
      }
    );

  const [getDecorationsViaRegion, { loading: getDecorationsViaRegionLoading }] =
    useLazyQuery<GetDecorationsViaRegionData, GetDecorationsViaRegionArgs>(
      GET_DECORATIONS_VIA_REGION,
      {
        onCompleted: (data) => {
          setDecorations(data.getDecorationsViaRegion);
        },
      }
    );

  const [favouriteDecoration, { loading: favouriteDecorationLoading }] =
    useMutation<FavouriteDecorationData, FavouriteDecorationArgs>(
      FAVOURITE_DECORATION,
      {
        onCompleted: () => {
          refetchUser();
          toast({
            variant: "success",
            title: "Success 🎉",
            description: "Decoration added to favourites",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error 😬",
            description:
              "Failed to add decoration to favourites. Please try again.",
          });
        },
      }
    );

  const [unFavouriteDecoration, { loading: unFavouriteDecorationLoading }] =
    useMutation<UnfavouriteDecorationData, UnfavouriteDecorationArgs>(
      UNFAVOURITE_DECORATION,
      {
        onCompleted: () => {
          refetchUser();
          toast({
            variant: "success",
            title: "Success 🎉",
            description: "Decoration removed from favourites",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error 😬",
            description:
              "Failed to remove decoration to favourites. Please try again.",
          });
        },
      }
    );

  const [createRoute, { loading: createRouteLoading }] = useMutation<
    CreateRouteData,
    CreateRouteArgs
  >(CREATE_ROUTE, {
    onCompleted: () => {
      setIsCreateRouteOpen(false);
      refetchUser();
      toast({
        variant: "success",
        title: "Success 🎉",
        description: "Created a new route",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to create a new route. Please try again.",
      });
    },
  });

  const createNewRoute = (name: string, decorationId: string | undefined) => {
    createRoute({
      variables: {
        input: {
          name: name,
          decorationId: decorationId ? decorationId : undefined,
        },
      },
    });
  };

  const addDecorationToFavourites = (decorationId: string) => {
    if (!currentUser) {
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
    } else {
      favouriteDecoration({ variables: { input: { id: decorationId } } });
    }
  };

  const removeDecorationFromFavourites = (decorationId: string) => {
    if (!currentUser) {
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
    } else {
      unFavouriteDecoration({ variables: { input: { id: decorationId } } });
    }
  };

  const signOut = async () => {
    await auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
        redirect("/");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: "Failed to sign out. Please try again.",
        });
      });
  };

  const changeRoute = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleScroll = (decorationId: string, index: number) => {
    refs[decorationId].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDecorationSelect = (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration,
    index: number
  ) => {
    mapRef.current?.flyTo({
      center: [decoration.longitude, decoration.latitude],
      zoom: 12,
      duration: 2000,
    });
    setActiveDecoration(decoration);
    setActiveDecorationIndex(index);
  };

  const discardRoute = () => {
    setIsCancelOpen(false);
    setIsCreateRouteOpen(false);
  };

  useEffect(() => {
    const getDecorationData = setTimeout(() => {
      if (viewState && viewState.zoom <= 6) {
        getDecorationsViaCountry({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
            },
          },
        });
      } else if (viewState && viewState.zoom > 6 && viewState.zoom <= 10) {
        getDecorationsViaRegion({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
            },
          },
        });
      } else {
        getDecorationsViaCity({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
            },
          },
        });
      }
    }, 1000);

    return () => clearTimeout(getDecorationData);
  }, [viewState]);

  const user = getUserData?.getUser ? getUserData.getUser : null;

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden"></div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen">
        <div className="fixed inset-y-0 left-0 z-50 w-20 overflow-y-auto border-r dark:border-black pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <button onClick={() => navigate(-1)}>
              <CaretLeft
                size={32}
                weight="bold"
                className="text-ch-dark dark:text-ch-light"
              />
            </button>
          </div>
          <nav className="mt-8">
            <ul role="list" className="flex flex-col items-center space-y-10">
              <li className="cursor-pointer" onClick={() => changeRoute("map")}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={classNames(
                          selectedIcon === "map"
                            ? "bg-ch-red text-white"
                            : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                        )}
                      >
                        <MapTrifold size={24} weight="bold" />
                        <span className="sr-only">Map</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Map</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => changeRoute("route-planning")}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={classNames(
                          selectedIcon === "route-planning"
                            ? "bg-ch-red text-white"
                            : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                        )}
                      >
                        <MapPin size={24} weight="bold" />
                        <span className="sr-only">Route Planning</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Route Planning</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => changeRoute("favourites")}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={classNames(
                          selectedIcon === "favourites"
                            ? "bg-ch-red text-white"
                            : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                        )}
                      >
                        <Heart size={24} weight="bold" />
                        <span className="sr-only">Favourites</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Favourites</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => changeRoute("history")}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={classNames(
                          selectedIcon === "history"
                            ? "bg-ch-red text-white"
                            : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                        )}
                      >
                        <ClockCounterClockwise size={24} weight="bold" />
                        <span className="sr-only">History</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>History</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </nav>
        </div>
        {/* Secondary column */}
        <SecondaryNav
          activeDecoration={activeDecoration}
          activeDecorationIndex={activeDecorationIndex}
          decorations={decorations}
          setActiveDecoration={setActiveDecoration}
          setActiveDecorationIndex={setActiveDecorationIndex}
          selectedIcon={selectedIcon}
          getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
          getDecorationsViaCityLoading={getDecorationsViaCityLoading}
          getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
          handleDecorationSelect={handleDecorationSelect}
          refs={refs}
          userFavourites={user?.favourites}
          userRoutes={user?.routes}
          getUserLoading={getUserLoading}
          currentUser={currentUser}
          userHistory={user?.history}
        />

        {/* Main column */}
        <main className="ml-[29rem] w-[75.8vw] h-screen">
          <RouteMap
            setViewState={setViewState}
            viewState={viewState}
            decorations={decorations}
            activeDecoration={activeDecoration}
            setActiveDecoration={setActiveDecoration}
            activeDecorationIndex={activeDecorationIndex}
            setActiveDecorationIndex={setActiveDecorationIndex}
            getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
            getDecorationsViaCityLoading={getDecorationsViaCityLoading}
            getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
            mapRef={mapRef}
            handleScroll={handleScroll}
          />
        </main>
        <div className="absolute top-5 right-16 z-50 cursor-pointer">
          {currentUser ? (
            <MenuItems signOut={signOut} user={user} />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserCircle
                  size={40}
                  weight="fill"
                  className="cursor-pointer text-ch-dark"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1 w-56" align="end" forceMount>
                <ThemeToggle />
                <Link to="/signin">
                  <DropdownMenuItem>Log in / Sign up</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {activeDecoration ? (
          <DecorationPopup
            activeDecoration={activeDecoration}
            setActiveDecoration={setActiveDecoration}
            userFavourites={user?.favourites.map((decoration) => decoration.id)}
            addDecorationToFavourites={addDecorationToFavourites}
            removeDecorationFromFavourites={removeDecorationFromFavourites}
            favouriteDecorationLoading={favouriteDecorationLoading}
            unFavouriteDecorationLoading={unFavouriteDecorationLoading}
            userRoutes={user?.routes}
            currentUser={currentUser}
            setIsCreateRouteOpen={setIsCreateRouteOpen}
          />
        ) : null}
        <CreateRouteModal
          isCreateRouteOpen={isCreateRouteOpen}
          isCancelOpen={isCancelOpen}
          setIsCancelOpen={setIsCancelOpen}
          discardRoute={discardRoute}
          createNewRoute={createNewRoute}
          activeDecoration={activeDecoration}
          createRouteLoading={createRouteLoading}
        />
      </div>
    </>
  );
};
