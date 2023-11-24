import { gql } from "@apollo/client";

export const GET_VERIFICATION_REQUESTS_COUNT = gql`
  query {
    getVerificationRequestsCount
  }
`;
