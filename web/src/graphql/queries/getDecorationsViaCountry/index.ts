import { gql } from "@apollo/client";

export const GET_DECORATIONS_VIA_COUNTRY = gql`
  query getDecorationsViaCountry($input: DecorationsViaMapInput!) {
    getDecorationsViaCountry(input: $input) {
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
