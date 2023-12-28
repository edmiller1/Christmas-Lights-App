import { gql } from "@apollo/client";

export const GET_DECORATIONS_BY_RATING = gql`
  query getDecorationsByRating {
    getDecorationsByRating {
      id
      name
      rating
      city
      country
      images {
        id
        url
      }
    }
  }
`;
