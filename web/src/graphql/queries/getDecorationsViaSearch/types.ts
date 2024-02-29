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
  getDecorationsViaSearch: {
    count: number;
    type: string;
    decorations: Get_Decorations_Via_Search[];
  };
}

export interface GetDecorationsViaSearchInput {
  searchTerm: string;
  skip: number;
}

export interface GetDecorationsViaSearchArgs {
  input: GetDecorationsViaSearchInput;
}
