import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Decoration, Route } from "@/lib/types";
import { Car, Path, Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { RoutesLoading } from "./components";
import { User } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { RouteCard } from "..";
import { convertDistance, convertTime } from "@/lib/helpers";

interface Props {
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  currentUser: User | null | undefined;
  setIsCreateRouteOpen: (isCreateRouteOpen: boolean) => void;
  openDeleteRouteModal: (routeId: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  openRemoveDecorationModal: (decorationId: string, routeId: string) => void;
  getRouteData: (coordinates: number[][] | undefined) => void;
  routeDuration: number;
  routeDistance: number;
  startRoute: () => void;
  dragDecoration: React.MutableRefObject<number>;
  draggedOverDecoration: React.MutableRefObject<number>;
  handleSortRoute: () => void;
  selectedRoute: Route | null;
  routeDecorations: Decoration[] | null;
  handleSelectRoute: (route: Route) => void;
  fetchRouteError: boolean;
  currentlyOnRoute: boolean;
  endRoute: () => void;
}

export const RoutesNav = ({
  currentUser,
  getUserLoading,
  userRoutes,
  setIsCreateRouteOpen,
  openDeleteRouteModal,
  isEditing,
  setIsEditing,
  openRemoveDecorationModal,
  getRouteData,
  routeDuration,
  routeDistance,
  startRoute,
  dragDecoration,
  draggedOverDecoration,
  handleSortRoute,
  selectedRoute,
  routeDecorations,
  handleSelectRoute,
  fetchRouteError,
  currentlyOnRoute,
  endRoute,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addRoute = () => {
    if (!currentUser) {
      toast({
        variant: "default",
        title: "Not currently signed in.",
        description: "Create an account to create new routes",
        action: (
          <ToastAction altText="Sign Up" onClick={() => navigate("/signin")}>
            Sign Up
          </ToastAction>
        ),
      });
    } else {
      setIsCreateRouteOpen(true);
    }
  };

  useEffect(() => {
    if (selectedRoute) {
      getRouteData(
        routeDecorations?.map((route) => [route.longitude, route.latitude])
      );
    }
  }, [selectedRoute, routeDecorations]);

  if (getUserLoading) {
    return <RoutesLoading />;
  }

  return (
    <aside className="fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
      <div className="bg-zinc-800 p-8 dark:border-b dark:border-black">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Routes</h1>
          {isEditing ? (
            <button
              className="mt-1 text-xs text-ch-red hover:underline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="mt-1 text-xs text-ch-red hover:underline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5 my-5">
          {userRoutes &&
            userRoutes.map((route) => (
              <TooltipProvider key={route.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${
                        selectedRoute && selectedRoute.id === route.id
                          ? "border relative cursor-pointer dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70 ring-2 ring-ch-green"
                          : "border relative cursor-pointer dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70"
                      }`}
                      onClick={
                        !isEditing ? () => handleSelectRoute(route) : () => {}
                      }
                    >
                      {isEditing ? (
                        <button
                          className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 dark:bg-zinc-900 dark:hover:bg-zinc-700"
                          onClick={() => {
                            openDeleteRouteModal(route.id);
                          }}
                        >
                          <X
                            size={8}
                            className="text-ch-dark dark:text-ch-light"
                          />
                        </button>
                      ) : null}
                      {route.decorations.length > 0 ? (
                        <img
                          src={route.decorations[0].images[0].url}
                          alt="Cristmas Decoration"
                          className="rounded-xl object-cover object-center"
                        />
                      ) : (
                        <span className="flex items-center justify-center text-xl">
                          {route.name[0].toUpperCase()}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{route.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Button
                variant="outline"
                className="w-full border-dashed dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70"
                onClick={addRoute}
              >
                <Plus
                  size={24}
                  weight="bold"
                  className="m-auto text-ch-dark dark:text-ch-light"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new route</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        {!currentUser ? (
          <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <span className="mt-3 text-lg">
              You must have an account to create routes.
            </span>
            <span>Login or signup to continue</span>
          </div>
        ) : selectedRoute && selectedRoute.decorations.length === 0 ? (
          <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <span className="mt-3 text-lg">This route has no decorations.</span>
            <span>
              Add decorations to get started with planning your route.
            </span>
          </div>
        ) : selectedRoute ? (
          <>
            {routeDecorations &&
              routeDecorations.map((decoration, index) => (
                <div key={decoration.id} className="px-5 py-3">
                  <RouteCard
                    index={index}
                    decoration={decoration}
                    openRemoveDecorationModal={openRemoveDecorationModal}
                    selectedRoute={selectedRoute}
                    handleSortRoute={handleSortRoute}
                    dragDecoration={dragDecoration}
                    draggedOverDecoration={draggedOverDecoration}
                  />
                </div>
              ))}
            <div className="m-5 flex items-center justify-start space-x-3">
              <Path
                size={24}
                weight="bold"
                className="text-gray-400 dark:text-zinc-300"
              />
              <div className="flex items-centers space-x-2">
                <span className="text-sm dark:text-zinc-300">
                  Total travel distance:{" "}
                </span>
                <span className="text-sm font-semibold">
                  {parseInt(convertDistance(routeDistance)) > 0
                    ? convertDistance(routeDistance)
                    : "-"}
                </span>
              </div>
            </div>
            <div className="m-5 flex items-center justify-start space-x-3">
              <Car
                size={24}
                weight="bold"
                className="text-gray-400 dark:text-zinc-300"
              />
              <div className="flex items-centers space-x-2">
                <span className="text-sm dark:text-zinc-300">
                  Total travel time:{" "}
                </span>
                <span className="text-sm font-semibold">
                  {parseInt(convertTime(routeDuration)) > 0
                    ? convertTime(routeDuration)
                    : "-"}
                </span>
              </div>
            </div>
            {routeDecorations && routeDecorations ? (
              <div className="m-5 flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={!currentlyOnRoute}
                  onClick={endRoute}
                >
                  End Route
                </Button>
                <Button
                  variant="default"
                  disabled={fetchRouteError || currentlyOnRoute}
                  onClick={() => startRoute()}
                >
                  Start Route
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <span className="mt-3 text-lg">No route selected.</span>
            <span>Select a route to get started.</span>
          </div>
        )}
      </div>
    </aside>
  );
};
