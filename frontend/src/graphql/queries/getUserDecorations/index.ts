import { gql } from "@apollo/client";

export const GET_USER_DECORATIONS = gql`
  query getUserDecorations {
    getUserDecorations {
      id
      name
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
      }
    }
  }
`;
