import { gql } from "@apollo/client";

export const GET_DECORATION_VERIFICATION = gql`
  query getDecoration($input: GetDecorationInput!) {
    getDecoration(input: $input) {
      id
      name
      address
      images {
        id
        url
      }
      creator_id
    }
  }
`;
