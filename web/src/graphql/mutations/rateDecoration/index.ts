import { gql } from "@apollo/client";

export const RATE_DECORATION = gql`
  mutation rateDecoration($input: RateDecorationInput!) {
    rateDecoration(input: $input) {
      id
    }
  }
`;
