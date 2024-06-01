import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Decoration, Route } from "@/lib/types";
import { Car, Path, Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { RouteCard, RoutesLoading } from "..";
import { convertDistance, convertTime } from "@/lib/helpers";
import { DrawerNavigation } from "../DrawerNavigation";
import { AnimatePresence, motion } from "framer-motion";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  isAuthenticated: boolean;
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
  selectedIcon: string;
  changeRoute: (icon: string) => void;
  setMobileMenuOpen?: (mobileMenuOpen: boolean) => void;
  currentUser: Get_User | null;
}

export const RoutesNav = ({
  isAuthenticated,
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
  selectedIcon,
  changeRoute,
  setMobileMenuOpen,
  currentUser,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addRoute = () => {
    if (!isAuthenticated && !currentUser) {
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
    return (
      <div className="hidden sm:block">
        <RoutesLoading />
      </div>
    );
  }

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <AnimatePresence>
          <motion.div
            className="fixed shadow w-full max-w-[560px] z-50 h-3/4 bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-background dark:bg-zinc-900 border-t dark:border-black sm:hidden"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            <div className="flex justify-center my-2 w-screen">
              <button
                className="w-1/4 bg-zinc-300 dark:bg-zinc-700 h-3 rounded-full"
                onClick={() => setMobileMenuOpen!(false)}
              ></button>
            </div>
            <div className="px-5 py-3 dark:text-ch-light">
              <DrawerNavigation
                selectedIcon={selectedIcon}
                changeRoute={changeRoute}
              />
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold dark:text-zinc-500">
                  Routes
                </span>
                {isEditing ? (
                  <Button variant="link" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                ) : (
                  <Button variant="link" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-x-4 gap-y-5 my-5">
                {userRoutes &&
                  userRoutes.map((route) => (
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
                          className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-4 -right-3 dark:bg-zinc-950 dark:hover:bg-zinc-700"
                          onClick={() => {
                            openDeleteRouteModal(route.id);
                          }}
                        >
                          <X
                            size={16}
                            className="text-ch-dark dark:text-ch-light"
                          />
                        </button>
                      ) : null}
                      {route.decorations.length > 0 ? (
                        <img
                          src={route.decorations[0].images[0].url}
                          alt="Cristmas Decoration"
                          className="rounded-xl object-cover object-center w-8 h-8"
                        />
                      ) : (
                        <span className="flex items-center justify-center text-xl">
                          {route.name[0].toUpperCase()}
                        </span>
                      )}
                    </Button>
                  ))}
              </div>
              <div className="full">
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-full bg-primary"
                  onClick={addRoute}
                >
                  <span className="font-semibold text-white">New Route</span>
                </Button>
              </div>
              {!isAuthenticated && !currentUser ? (
                <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
                  <span className="mt-3 text-lg">
                    You must have an account to create routes.
                  </span>
                  <span>Login or signup to continue</span>
                </div>
              ) : selectedRoute && selectedRoute.decorations.length === 0 ? (
                <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
                  <span className="mt-3 text-lg">
                    This route has no decorations.
                  </span>
                  <span>
                    Add decorations to get started with planning your route.
                  </span>
                </div>
              ) : selectedRoute ? (
                <div className="h-80 overflow-y-auto mt-5 mb-10">
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
                        onClick={() => {
                          startRoute();
                          setMobileMenuOpen!(false);
                        }}
                      >
                        Start Route
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop */}
      <aside className="hidden sm:block fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
        <div className="p-8 border-b dark:border-black">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Routes</h1>
            {isEditing ? (
              <button
                className="mt-1 text-xs text-primary hover:underline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            ) : (
              <Button variant="link" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
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
          {!isAuthenticated && !currentUser ? (
            <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
              <span className="mt-3 text-lg">
                You must have an account to create routes.
              </span>
              <span>Login or signup to continue</span>
            </div>
          ) : selectedRoute && selectedRoute.decorations.length === 0 ? (
            <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
              <span className="mt-3 text-lg">
                This route has no decorations.
              </span>
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
            <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
              <span className="mt-3 text-lg">No route selected.</span>
              <span>Select a route to get started.</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
