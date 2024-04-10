import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { DecorationsNav, FavouritesNav, HistoryNav, RoutesNav } from "..";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration, Route } from "@/lib/types";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";

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
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  isAuthenticated: boolean;
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
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
  userHistory: Decoration[] | undefined;
  nextPage: () => void;
  previousPage: () => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const MenuDrawer = ({
  selectedIcon,
  changeRoute,
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
  mobileMenuOpen,
  setMobileMenuOpen,
  userHistory,
  nextPage,
  pageNumber,
  previousPage,
  setPageNumber,
  totalPages,
  searchTerm,
  setSearchTerm,
}: Props) => {
  if (selectedIcon === "route-planning" && mobileMenuOpen) {
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
        setMobileMenuOpen={setMobileMenuOpen}
      />
    );
  } else if (selectedIcon === "favourites" && mobileMenuOpen) {
    return (
      <FavouritesNav
        activeDecoration={activeDecoration}
        isAuthenticated={isAuthenticated}
        getUserLoading={getUserLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        userFavourites={userFavourites}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
      />
    );
  } else if (selectedIcon === "history" && mobileMenuOpen) {
    return (
      <HistoryNav
        activeDecoration={activeDecoration}
        isAuthenticated={isAuthenticated}
        getUserLoading={getUserLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        userFavourites={userFavourites}
        userHistory={userHistory}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
      />
    );
  } else if (selectedIcon === "map" && mobileMenuOpen) {
    return (
      <DecorationsNav
        activeDecoration={activeDecoration}
        changeRoute={changeRoute}
        decorations={decorations}
        getDecorationsViaCityLoading={getDecorationsViaCityLoading}
        getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
        getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
        searchForDecorationsLoading={searchForDecorationsLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        searchDecorations={searchDecorations}
        selectedIcon={selectedIcon}
        userFavourites={userFavourites}
        setMobileMenuOpen={setMobileMenuOpen}
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
