import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_Via_Region {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  images: DecorationImage[];
}

export interface GetDecorationsViaRegion {
  getDecorationsViaRegion: Get_Decorations_Via_Region[];
}

export interface GetDecorationsViaRegionInput {
  latitude: string;
  longitude: string;
}

export interface GetDecorationsViaRegionArgs {
  input: GetDecorationsViaRegionInput;
}
