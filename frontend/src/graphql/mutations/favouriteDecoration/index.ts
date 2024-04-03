import { gql } from "@apollo/client";

export const FAVOURITE_DECORATION = gql`
  mutation favouriteDecoration($input: FavouriteDecorationInput!) {
    favouriteDecoration(input: $input) {
      id
    }
  }
`;
