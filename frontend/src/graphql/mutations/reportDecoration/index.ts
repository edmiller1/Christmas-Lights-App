import { gql } from "@apollo/client";

export const REPORT_DECORATION = gql`
  mutation reportDecoration($input: ReportDecorationInput!) {
    reportDecoration(input: $input) {
      id
    }
  }
`;
