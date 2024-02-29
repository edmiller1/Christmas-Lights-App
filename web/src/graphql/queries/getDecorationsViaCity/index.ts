import { gql } from "@apollo/client";

export const GET_DECORATIONS_VIA_CITY = gql`
  query getDecorationsViaCity($input: DecorationsViaMapInput!) {
    getDecorationsViaCity(input: $input) {
      count
      type
      decorations {
        id
        name
        city
        country
        rating
        latitude
        longitude
        images {
          id
          url
        }
      }
    }
  }
`;
