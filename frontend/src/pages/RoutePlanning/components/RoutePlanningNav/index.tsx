import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Get_User } from "@/graphql/queries/getUser/types";
import { CaretLeft, Heart, MapPin, MapTrifold } from "@phosphor-icons/react";
import { ClockCounterClockwise } from "@phosphor-icons/react/dist/ssr/ClockCounterClockwise";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { MenuDrawer } from "..";
import { Button } from "@/components/ui/button";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";
import { Decoration, Route } from "@/lib/types";
import { useState } from "react";
import { UserMenuDrawer } from "@/components";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  selectedIcon: string;
  changeRoute: (icon: string) => void;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  decorations:
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | Get_Decorations_Via_Search[]
    | null;
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  searchForDecorationsLoading: boolean;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration
  ) => void;
  refs: any;
  userFavourites: Decoration[] | undefined;
  searchDecorations: (searchTerm: string) => void;
  currentUser: Get_User | null;
  isAuthenticated: boolean;
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  setIsCreateRouteOpen: (isCreateRouteOpen: boolean) => void;
  openDeleteRouteModal: (routeId: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
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
  userHistory: Decoration[] | undefined;
  nextPage: () => void;
  previousPage: () => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const RoutePlanningNav = ({
  changeRoute,
  selectedIcon,
  currentUser,
  activeDecoration,
  decorations,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  searchForDecorationsLoading,
  handleDecorationSelect,
  refs,
  searchDecorations,
  userFavourites,
  isAuthenticated,
  currentlyOnRoute,
  dragDecoration,
  draggedOverDecoration,
  endRoute,
  fetchRouteError,
  getRouteData,
  getUserLoading,
  handleSelectRoute,
  handleSortRoute,
  setIsEditing,
  isEditing,
  openDeleteRouteModal,
  openRemoveDecorationModal,
  routeDecorations,
  routeDistance,
  routeDuration,
  selectedRoute,
  setIsCreateRouteOpen,
  startRoute,
  userRoutes,
  userHistory,
  nextPage,
  pageNumber,
  previousPage,
  setPageNumber,
  totalPages,
  searchTerm,
  setSearchTerm,
}: Props) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <nav className="fixed shadow w-full max-w-[560px] z-50 h-24 bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-slate-50 dark:bg-zinc-900 border-t dark:border-black sm:hidden">
          <MenuDrawer
            selectedIcon={selectedIcon}
            changeRoute={changeRoute}
            activeDecoration={activeDecoration}
            decorations={decorations}
            getDecorationsViaCityLoading={getDecorationsViaCityLoading}
            getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
            getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
            searchForDecorationsLoading={searchForDecorationsLoading}
            handleDecorationSelect={handleDecorationSelect}
            refs={refs}
            searchDecorations={searchDecorations}
            userFavourites={userFavourites}
            isAuthenticated={isAuthenticated}
            currentlyOnRoute={currentlyOnRoute}
            dragDecoration={dragDecoration}
            draggedOverDecoration={draggedOverDecoration}
            endRoute={endRoute}
            fetchRouteError={fetchRouteError}
            getRouteData={getRouteData}
            getUserLoading={getUserLoading}
            handleSelectRoute={handleSelectRoute}
            handleSortRoute={handleSortRoute}
            isEditing={isEditing}
            openDeleteRouteModal={openDeleteRouteModal}
            openRemoveDecorationModal={openRemoveDecorationModal}
            routeDecorations={routeDecorations}
            routeDistance={routeDistance}
            routeDuration={routeDuration}
            selectedRoute={selectedRoute}
            setIsCreateRouteOpen={setIsCreateRouteOpen}
            setIsEditing={setIsEditing}
            startRoute={startRoute}
            userRoutes={userRoutes}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            userHistory={userHistory}
            nextPage={nextPage}
            pageNumber={pageNumber}
            previousPage={previousPage}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="w-full flex items-center justify-center mt-2">
            <button
              className="w-1/4 bg-zinc-700 h-3 rounded-full"
              onClick={() => setMobileMenuOpen(true)}
            ></button>
          </div>
          <div className="flex flex-auto items-start justify-between p-2 space-x-3">
            {selectedIcon === "map" ? (
              <div className="flex items-center space-x-3 mt-2">
                <MapTrifold size={28} weight="bold" />
                <span className="text-2xl font-semibold">Map</span>
              </div>
            ) : selectedIcon === "route-planning" ? (
              <div className="flex items-center space-x-3 mt-2">
                <MapPin size={28} weight="bold" />
                <span className="text-2xl font-semibold">Route Planning</span>
              </div>
            ) : selectedIcon ? (
              <div className="flex items-center space-x-3 mt-2">
                <Heart size={28} weight="bold" />
                <span className="text-2xl font-semibold">Favourites</span>
              </div>
            ) : selectedIcon === "history" ? (
              <ClockCounterClockwise size={28} weight="bold" />
            ) : null}
            {currentUser ? (
              <Drawer>
                <DrawerTrigger>
                  <Avatar>
                    <AvatarImage
                      src={currentUser?.image}
                      alt="profile picture"
                    />
                    <AvatarFallback>
                      {currentUser?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <UserMenuDrawer currentUser={currentUser} />
                </DrawerTrigger>
              </Drawer>
            ) : (
              <Button className="w-1/4" onClick={() => navigate("/signin")}>
                Log In
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block fixed inset-y-0 left-0 z-50 w-20 overflow-y-auto border-r border-secondary pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <button onClick={() => navigate("/home")}>
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
                          ? "bg-primary text-white"
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
                          ? "bg-primary text-white"
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
                          ? "bg-primary text-white"
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
                          ? "bg-primary text-white"
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
    </>
  );
};
