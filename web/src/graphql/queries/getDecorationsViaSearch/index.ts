import { gql } from "@apollo/client";

export const GET_DECORATIONS_VIA_SEARCH = gql`
  query getDecorationsViaSearch($input: DecorationsViaSearchInput!) {
    getDecorationsViaSearch(input: $input) {
      count
      type
      decorations {
        id
        name
        city
        country
        rating
        images {
          id
          url
        }
        latitude
        longitude
      }
    }
  }
`;
