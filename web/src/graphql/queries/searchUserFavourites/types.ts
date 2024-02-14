import { DecorationImage } from "@/lib/types";

export interface Search_User_Favourites {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  images: DecorationImage[];
  latitude: number;
  longitude: number;
}

export interface SearchUserFavourites {
  searchUserFavourites: Search_User_Favourites[];
}

export interface SearchUserFavouritesInput {
  searchTerm: string;
}

export interface SearchUserFavouritesArgs {
  input: SearchUserFavouritesInput;
}
