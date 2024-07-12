import { Decoration } from "@/lib/types";

export interface Get_User_Favourites {
  __typename: "User";
  id: string;
  name: string;
  favourites: Decoration[];
}

export interface GetUserFavourites {
  getUserFavourites: Get_User_Favourites;
}
