import { DecorationImage } from "@/lib/types";

export interface Search_For_Decorations {
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

export interface SearchForDecorations {
  searchForDecorations: {
    count: number;
    type: string;
    decorations: Search_For_Decorations[];
  };
}

export interface SearchForDecorationsInput {
  searchTerm: string;
  skip: number;
}

export interface SearchForDecorationsArgs {
  input: SearchForDecorationsInput;
}
