import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_Via_Search {
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

export interface GetDecorationsViaSearch {
  getDecorationsViaSearch: Get_Decorations_Via_Search[];
}

export interface GetDecorationsViaSearchInput {
  searchTerm: string;
}

export interface GetDecorationsViaSearchArgs {
  input: GetDecorationsViaSearchInput;
}
