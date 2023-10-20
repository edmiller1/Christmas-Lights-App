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
  verificationSubmitted: boolean;
  rating: number;
  numRatings: number;
  numViews: number;
  ratings: Array<{ id: string; rating: number }>;
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
