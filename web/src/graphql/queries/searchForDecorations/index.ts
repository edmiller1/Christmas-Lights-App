import { gql } from "@apollo/client";

export const SEARCH_FOR_DECORATIONS = gql`
  query searchForDecorations($input: GlobalSearchInput!) {
    searchForDecorations(input: $input) {
      count
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
