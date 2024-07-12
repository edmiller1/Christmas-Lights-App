import { gql } from "@apollo/client";

export const GET_USER_FAVOURITES = gql`
  query getUserFavourites {
    getUserFavourites {
      id
      name
      favourites {
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
