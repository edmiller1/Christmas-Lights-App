export interface Unfavourite_Decoration {
  __typename: "User";
  id: string;
}

export interface UnfavouriteDecoration {
  unfavouriteDecoration: Unfavourite_Decoration;
}

export interface UnfavouriteDecorationInput {
  id: string;
}

export interface UnfavouriteDecorationArgs {
  input: UnfavouriteDecorationInput;
}
