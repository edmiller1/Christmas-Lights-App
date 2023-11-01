import { gql } from "@apollo/client";

export const UNFAVOURITE_DECORATION = gql`
  mutation unfavouriteDecoration($input: UnfavouriteDecorationInput!) {
    unfavouriteDecoration(input: $input) {
      id
    }
  }
`;
