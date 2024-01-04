import { DecorationImage } from "@/lib/types";

export interface Get_Recommended_Decorations {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  images: DecorationImage[];
}

export interface GetRecommendedDecorations {
  getRecommendedDecorations: Get_Recommended_Decorations[];
}

export interface GetRecommendedDecorationsInput {
  id: string;
  city: string;
}

export interface GetRecommendedDecorationsArgs {
  input: GetRecommendedDecorationsInput;
}
