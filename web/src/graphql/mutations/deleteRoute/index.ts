import { gql } from "@apollo/client";

export const DELETE_ROUTE = gql`
  mutation deleteRoute($input: DeleteRouteInput!) {
    deleteRoute(input: $input) {
      id
    }
  }
`;
