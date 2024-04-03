export interface Get_Decoration {
  __typename: "Decoration";
  id: string;
  name: string;
  address: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  images: Array<{ id: string; url: string }>;
  verified: boolean;
  verification_submitted: boolean;
  rating: number;
  num_ratings: number;
  num_views: number;
  ratings: Array<{
    id: string;
    rating: number;
    user_id: string;
    decoration_id: string;
  }>;
  creator_id: string;
  views: Array<{ id: string }>;
}

export interface GetDecoration {
  getDecoration: Get_Decoration;
}

export interface GetDecorationInput {
  id: string;
}

export interface GetDecorationArgs {
  input: GetDecorationInput;
}
