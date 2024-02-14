import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { DecorationsNav, FavouritesNav, HistoryNav, RoutesNav } from "..";
import { Decoration, Route } from "@/lib/types";
import { User } from "firebase/auth";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";
import { Search_User_Favourites } from "@/graphql/queries/searchUserFavourites/types";

interface Props {
  selectedIcon: string;
  decorations:
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | Get_Decorations_Via_Search[]
    | null;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  activeDecorationIndex: number;
  setActiveDecoration: (
    activeDecoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration
      | undefined
  ) => void;
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration,
    index: number
  ) => void;
  refs: any;
  userFavourites: Decoration[] | undefined;
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  currentUser: User | null | undefined;
  userHistory: Decoration[] | undefined;
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
  searchForDecorations: (searchTerm: string) => void;
  getDecoratiosnViaSearchLoading: boolean;
}

export const SecondaryNav = ({
  selectedIcon,
  activeDecoration,
  activeDecorationIndex,
  decorations,
  setActiveDecoration,
  setActiveDecorationIndex,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  handleDecorationSelect,
  refs,
  userFavourites,
  userRoutes,
  getUserLoading,
  currentUser,
  userHistory,
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
  searchForDecorations,
  getDecoratiosnViaSearchLoading,
}: Props) => {
  if (selectedIcon === "route-planning") {
    return (
      <RoutesNav
        userRoutes={userRoutes}
        getUserLoading={getUserLoading}
        currentUser={currentUser}
        setIsCreateRouteOpen={setIsCreateRouteOpen}
        openDeleteRouteModal={openDeleteRouteModal}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        openRemoveDecorationModal={openRemoveDecorationModal}
        getRouteData={getRouteData}
        routeDuration={routeDuration}
        routeDistance={routeDistance}
        startRoute={startRoute}
        dragDecoration={dragDecoration}
        draggedOverDecoration={draggedOverDecoration}
        handleSortRoute={handleSortRoute}
        selectedRoute={selectedRoute}
        routeDecorations={routeDecorations}
        handleSelectRoute={handleSelectRoute}
        fetchRouteError={fetchRouteError}
        currentlyOnRoute={currentlyOnRoute}
        endRoute={endRoute}
      />
    );
  } else if (selectedIcon === "favourites") {
    return (
      <FavouritesNav
        activeDecoration={activeDecoration}
        currentUser={currentUser}
        getUserLoading={getUserLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        userFavourites={userFavourites}
      />
    );
  } else if (selectedIcon === "history") {
    return (
      <HistoryNav
        activeDecoration={activeDecoration}
        currentUser={currentUser}
        userHistory={userHistory}
        getUserLoading={getUserLoading}
        refs={refs}
        handleDecorationSelect={handleDecorationSelect}
        userFavourites={userFavourites}
      />
    );
  } else {
    return (
      <DecorationsNav
        activeDecoration={activeDecoration}
        activeDecorationIndex={activeDecorationIndex}
        decorations={decorations}
        getDecorationsViaCityLoading={getDecorationsViaCityLoading}
        getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
        getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        setActiveDecoration={setActiveDecoration}
        setActiveDecorationIndex={setActiveDecorationIndex}
        userFavourites={userFavourites}
        searchForDecorations={searchForDecorations}
        getDecoratiosnViaSearchLoading={getDecoratiosnViaSearchLoading}
      />
    );
  }
};
