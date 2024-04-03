import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_Via_Region {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  latitude: number;
  longitude: number;
  images: DecorationImage[];
}

export interface GetDecorationsViaRegion {
  getDecorationsViaRegion: {
    count: number;
    type: string;
    decorations: Get_Decorations_Via_Region[];
  };
}

export interface GetDecorationsViaRegionInput {
  latitude: string;
  longitude: string;
  skip: number;
}

export interface GetDecorationsViaRegionArgs {
  input: GetDecorationsViaRegionInput;
}
