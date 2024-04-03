import { gql } from "@apollo/client";

export const GET_DECORATIONS_BY_CITY = gql`
  query getDecorationsByCity {
    getDecorationsByCity {
      id
      name
      city
      country
      rating
      images {
        id
        url
      }
    }
  }
`;
