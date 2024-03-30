import { gql } from "@apollo/client";

export const CREATE_DECORATION = gql`
  mutation createDecoration($input: CreateDecorationInput!) {
    createDecoration(input: $input) {
      id
    }
  }
`;
