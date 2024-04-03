import { gql } from "@apollo/client";

export const EDIT_NAME = gql`
  mutation editName($input: EditNameInput!) {
    editName(input: $input) {
      id
    }
  }
`;
