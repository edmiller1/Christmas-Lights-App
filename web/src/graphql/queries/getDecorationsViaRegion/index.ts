import { gql } from "@apollo/client";

export const GET_DECORATIONS_VIA_REGION = gql`
  query getDecorationsViaRegion($input: DecorationsViaMapInput!) {
    getDecorationsViaRegion(input: $input) {
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
