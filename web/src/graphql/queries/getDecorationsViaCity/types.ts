import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_Via_City {
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

export interface GetDecorationsViaCity {
  getDecorationsViaCity: Get_Decorations_Via_City[];
}

export interface GetDecorationsViaCityInput {
  latitude: string;
  longitude: string;
}

export interface GetDecorationsViaCityArgs {
  input: GetDecorationsViaCityInput;
}
