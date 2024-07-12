import { gql } from "@apollo/client";

export const GET_USER_HISTORY = gql`
  query getUserHistory {
    getUserHistory {
      id
      name
      history {
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
