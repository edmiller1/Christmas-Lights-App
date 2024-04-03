import { gql } from "@apollo/client";

export const ADD_DECORATION_TO_HISTORY = gql`
  mutation addDecorationToHistory($input: AddDecorationToHistoryInput!) {
    addDecorationToHistory(input: $input) {
      id
    }
  }
`;
