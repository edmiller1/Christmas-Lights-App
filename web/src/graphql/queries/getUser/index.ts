import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($input: GetUserInput!) {
    getUser(input: $input) {
      id
      name
      email
      image
      ratings {
        id
        rating
        decoration_id
      }
    }
  }
`;
