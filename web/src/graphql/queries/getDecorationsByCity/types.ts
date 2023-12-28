import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_By_City {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  images: DecorationImage[];
}

export interface GetDecorationsByCity {
  getDecorationsByCity: Get_Decorations_By_City[];
}
