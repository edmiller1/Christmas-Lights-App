export interface Rate_Decoration {
  __typename: "Decoration";
  id: string;
}

export interface RateDecoration {
  rateDecoration: Rate_Decoration;
}

export interface RateDecorationInput {
  id?: string;
  rating: number;
}

export interface RateDecorationArgs {
  input: RateDecorationInput;
}
