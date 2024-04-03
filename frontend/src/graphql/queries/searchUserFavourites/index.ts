import { gql } from "@apollo/client";

export const SEARCH_USER_FAVOURITES = gql`
  query searchUserFavourites($input: SearchInput!) {
    searchUserFavourites(input: $input) {
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
`;
