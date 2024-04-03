import { gql } from "@apollo/client";

export const DELETE_RATING = gql`
  mutation deleteRating($input: DeleteRatingInput!) {
    deleteRating(input: $input) {
      id
    }
  }
`;
