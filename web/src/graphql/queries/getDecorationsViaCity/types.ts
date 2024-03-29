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
  getDecorationsViaCity: {
    count: number;
    type: string;
    decorations: Get_Decorations_Via_City[];
  };
}

export interface GetDecorationsViaCityInput {
  latitude: string;
  longitude: string;
  skip: number;
}

export interface GetDecorationsViaCityArgs {
  input: GetDecorationsViaCityInput;
}
