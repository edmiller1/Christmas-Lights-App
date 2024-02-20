import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { DecorationsNav, FavouritesNav, HistoryNav, RoutesNav } from "..";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration, Route } from "@/lib/types";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";
import { User } from "firebase/auth";

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
  searchForDecorations: (searchTerm: string) => void;
  getDecorationsViaSearchLoading: boolean;
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  currentUser: User | null | undefined;
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
}

export const MenuDrawer = ({
  selectedIcon,
  changeRoute,
  activeDecoration,
  decorations,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  getDecorationsViaSearchLoading,
  handleDecorationSelect,
  refs,
  searchForDecorations,
  userFavourites,
  currentUser,
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
}: Props) => {
  if (selectedIcon === "route-planning" && mobileMenuOpen) {
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
        selectedIcon={selectedIcon}
        changeRoute={changeRoute}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    );
  } else if (selectedIcon === "favourites" && mobileMenuOpen) {
    return (
      <FavouritesNav
        activeDecoration={activeDecoration}
        currentUser={currentUser}
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
        currentUser={currentUser}
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
        getDecorationsViaSearchLoading={getDecorationsViaSearchLoading}
        handleDecorationSelect={handleDecorationSelect}
        refs={refs}
        searchForDecorations={searchForDecorations}
        selectedIcon={selectedIcon}
        userFavourites={userFavourites}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    );
  }
};
