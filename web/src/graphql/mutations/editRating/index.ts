import { gql } from "@apollo/client";

export const EDIT_RATING = gql`
  mutation editRating($input: EditRatingInput!) {
    editRating(input: $input) {
      id
    }
  }
`;
