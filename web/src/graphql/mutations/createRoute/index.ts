import { gql } from "@apollo/client";

export const CREATE_ROUTE = gql`
  mutation createRoute($input: CreateRouteInput!) {
    createRoute(input: $input) {
      id
    }
  }
`;
