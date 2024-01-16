import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_DECORATIONS_VIA_CITY,
  GET_DECORATIONS_VIA_COUNTRY,
  GET_DECORATIONS_VIA_REGION,
  GET_USER,
} from "@/graphql/queries";
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
import { redirect, useNavigate } from "react-router-dom";
import {
  CaretLeft,
  ClockCounterClockwise,
  Heart,
  MapPin,
  MapTrifold,
  Star,
  X,
} from "@phosphor-icons/react";
import { RouteMap, SecondaryNav } from "./components";
import { MenuItems } from "@/components/AppHeader/components";
import { useUserData } from "@/lib/hooks";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewState } from "@/lib/types";
import { MapRef } from "react-map-gl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  >();
  const [activeDecorationIndex, setActiveDecorationIndex] = useState<number>(0);

  const refs = decorations?.reduce((acc: any, value: any) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const { data: getUserData, loading: getUserLoading } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
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
    console.log(refs);
    refs[decorationId].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDecorationSelect = (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region,
    index: number
  ) => {
    mapRef.current?.flyTo({
      center: [decoration.longitude, decoration.latitude],
      zoom: 14,
      duration: 2000,
    });
    setActiveDecoration(decoration);
    setActiveDecorationIndex(index);
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
          <MenuItems signOut={signOut} user={user} />
        </div>
        {activeDecoration ? (
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="absolute bottom-10 right-2 w-72 rounded-xl bg-white text-black p-2"
          >
            <div className="flex items-center justify-between py-1 px-2">
              <span className="font-semibold">{activeDecoration.name}</span>
              <button
                className="p-1 rounded-full hover:bg-gray-400/40"
                onClick={() => setActiveDecoration(undefined)}
              >
                <X size={16} weight="bold" className="text-gray-600" />
              </button>
            </div>
            <img
              src={activeDecoration.images[0].url}
              alt="Christmas Decoration"
              className="rounded-2xl w-full h-48 object-cover object-center p-2"
            />
            <div className="flex flex-col space-y-3 bg-gray-100 rounded-xl p-2 mx-2">
              <div className="flex items-center text-xs space-x-2">
                <MapPin size={16} className="text-gray-800" />
                <span>
                  {activeDecoration.city}, {activeDecoration.country}
                </span>
              </div>
              <div className="flex items-center text-xs space-x-2">
                <Star size={16} className="text-gray-800" />
                <span>{activeDecoration.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mx-2 my-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-1/5 dark:bg-gray-200 dark:border-none dark:hover:bg-gray-300"
                    >
                      <Heart
                        size={32}
                        weight="bold"
                        className="text-gray-400"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Add to favourites</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="default"
                className="w-4/5 dark:bg-ch-green dark:hover:bg-ch-green-hover"
              >
                Add to route
              </Button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </>
  );
};
