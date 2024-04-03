import { gql } from "@apollo/client";

export const GET_RECENT_REPORTS = gql`
  query getRecentReports {
    getRecentReports {
      id
      additionalInfo
      created_at
      reasons
      unresolved
      decoration {
        id
        name
        address
        images {
          id
          url
        }
      }
    }
  }
`;
