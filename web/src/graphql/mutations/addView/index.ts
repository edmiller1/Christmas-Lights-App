import { gql } from "@apollo/client";

export const ADD_VIEW = gql`
  mutation addView($input: AddViewInput!) {
    addView(input: $input) {
      id
    }
  }
`;
