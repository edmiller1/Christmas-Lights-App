import { gql } from "@apollo/client";

export const ADD_DECORATION_TO_ROUTE = gql`
  mutation addDecorationToRoute($input: AddDecorationToRouteInput!) {
    addDecorationToRoute(input: $input) {
      id
    }
  }
`;
