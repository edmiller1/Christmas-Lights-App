import { DecorationImage } from "@/lib/types";

export interface Get_Decorations_By_Rating {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  images: DecorationImage[];
}

export interface GetDecorationsByRating {
  getDecorationsByRating: Get_Decorations_By_Rating[];
}
