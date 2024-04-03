export interface Favourite_Decoration {
  __typename: "User";
  id: string;
}

export interface FavouriteDecoration {
  favouriteDecoration: Favourite_Decoration;
}

export interface FavouriteDecorationInput {
  id: string;
}

export interface FavouriteDecorationArgs {
  input: FavouriteDecorationInput;
}
