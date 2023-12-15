export interface Get_Recommended_Decorations {
  __typename: "Decoration";
  id: string;
  name: string;
  city: string;
  country: string;
  rating: string;
  images: {
    id: string;
    url: string;
  };
}

export interface GetRecommendedDecorations {
  getRecommendedDecorations: Get_Recommended_Decorations;
}

export interface GetRecommendedDecorationsInput {
  city: string;
}

export interface GetRecommendedDecorationsArgs {
  input: GetRecommendedDecorationsInput;
}
