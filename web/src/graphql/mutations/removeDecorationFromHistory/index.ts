import { gql } from "@apollo/client";

export const REMOVE_DECORATION_FROM_HISTORY = gql`
  mutation removeDecorationFromHistory(
    $input: RemoveDecorationFromHistoryInput!
  ) {
    removeDecorationFromHistory(input: $input) {
      id
    }
  }
`;
