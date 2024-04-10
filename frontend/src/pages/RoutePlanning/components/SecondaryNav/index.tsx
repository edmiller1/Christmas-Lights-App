import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { DecorationsNav, FavouritesNav, HistoryNav, RoutesNav } from "..";
import { Decoration, Route } from "@/lib/types";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";

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
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  isAuthenticated: boolean;
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
  searchDecorations: (searchTerm: string) => void;
  changeRoute: (icon: string) => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SecondaryNav = ({
  selectedIcon,
  activeDecoration,
  decorations,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  searchForDecorationsLoading,
  handleDecorationSelect,
  refs,
  userFavourites,
  userRoutes,
  getUserLoading,
  isAuthenticated,
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
  searchDecorations,
  changeRoute,
  nextPage,
  pageNumber,
  previousPage,
  setPageNumber,
  totalPages,
  searchTerm,
  setSearchTerm,
}: Props) => {
  if (selectedIcon === "route-planning") {
    return (
      <RoutesNav
        userRoutes={userRoutes}
        getUserLoading={getUserLoading}
        isAuthenticated={isAuthenticated}
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
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
      />
    );
  } else if (selectedIcon === "favourites") {
    return (
      <FavouritesNav
        activeDecoration={activeDecoration}
        isAuthenticated={isAuthenticated}
        getUserLoading={getUserLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        userFavourites={userFavourites}
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
      />
    );
  } else if (selectedIcon === "history") {
    return (
      <HistoryNav
        activeDecoration={activeDecoration}
        isAuthenticated={isAuthenticated}
        userHistory={userHistory}
        getUserLoading={getUserLoading}
        refs={refs}
        handleDecorationSelect={handleDecorationSelect}
        userFavourites={userFavourites}
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
      />
    );
  } else {
    return (
      <DecorationsNav
        activeDecoration={activeDecoration}
        decorations={decorations}
        getDecorationsViaCityLoading={getDecorationsViaCityLoading}
        getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
        getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
        searchForDecorationsLoading={searchForDecorationsLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        userFavourites={userFavourites}
        searchDecorations={searchDecorations}
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
        nextPage={nextPage}
        pageNumber={pageNumber}
        previousPage={previousPage}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    );
  }
};
