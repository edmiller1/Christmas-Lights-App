import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { DecorationsNav, FavouritesNav, HistoryNav, RoutesNav } from "..";
import { Decoration, Route } from "@/lib/types";
import { User } from "firebase/auth";

interface Props {
  selectedIcon: string;
  decorations:
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
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
}: Props) => {
  if (selectedIcon === "route-planning") {
    return (
      <RoutesNav
        userRoutes={userRoutes}
        getUserLoading={getUserLoading}
        currentUser={currentUser}
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
      />
    );
  }
};
