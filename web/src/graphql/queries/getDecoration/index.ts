import { gql } from "@apollo/client";

export const GET_DECORATION = gql`
  query getDecoration($input: GetDecorationInput!) {
    getDecoration(input: $input) {
      id
      name
      address
      images {
        id
        url
      }
      country
      region
      city
      latitude
      longitude
      verified
      verificationSubmitted
      rating
      numRatings
      numViews
      ratings {
        id
        rating
      }
    }
  }
`;
