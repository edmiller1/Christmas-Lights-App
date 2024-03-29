import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_Via_Country {
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

export interface GetDecorationsViaCountry {
  getDecorationsViaCountry: {
    count: number;
    type: string;
    decorations: Get_Decorations_Via_Country[];
  };
}

export interface GetDecorationsViaCountryInput {
  latitude: string;
  longitude: string;
  skip: number;
}

export interface GetDecorationsViaCountryArgs {
  input: GetDecorationsViaCountryInput;
}
