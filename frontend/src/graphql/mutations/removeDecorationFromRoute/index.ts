import { gql } from "@apollo/client";

export const REMOVE_DECORATION_FROM_ROUTE = gql`
  mutation removeDecorationFromRoute($input: RemoveDecorationFromRouteInput!) {
    removeDecorationFromRoute(input: $input) {
      id
    }
  }
`;
