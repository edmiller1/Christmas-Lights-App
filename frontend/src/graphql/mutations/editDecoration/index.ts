import { gql } from "@apollo/client";

export const EDIT_DECORATION = gql`
  mutation editDecoration($input: EditDecorationInput!) {
    editDecoration(input: $input) {
      id
    }
  }
`;
