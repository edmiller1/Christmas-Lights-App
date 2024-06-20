import { gql } from "@apollo/client";

export const CANCEL_SESSION = gql`
  query {
    cancelSession
  }
`;
