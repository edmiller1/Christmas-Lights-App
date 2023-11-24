import { gql } from "@apollo/client";

export const GET_UNRESOLVED_REPORTS_COUNT = gql`
  query {
    getUnresolvedReportsCount
  }
`;
