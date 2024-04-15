import { gql } from "@apollo/client";

export const DELETE_DECORATION = gql`
  mutation deleteDecoration($input: DeleteDecorationInput!) {
    deleteDecoration(input: $input) {
      id
    }
  }
`;
