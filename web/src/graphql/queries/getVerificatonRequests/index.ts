import { gql } from "@apollo/client";

export const GET_VERIFICATION_REQUESTS = gql`
  query getVerificationRequests {
    getVerificationRequests {
      id
      document
      approved
      rejected
      rejected_reason
      archived
      decoration_id
    }
  }
`;
