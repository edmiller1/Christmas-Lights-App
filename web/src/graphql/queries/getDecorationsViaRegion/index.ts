import { gql } from "@apollo/client";

export const GET_DECORATIONS_VIA_REGION = gql`
  query getDecorationsViaRegion($input: DecorationsViaMapInput!) {
    getDecorationsViaRegion(input: $input) {
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
