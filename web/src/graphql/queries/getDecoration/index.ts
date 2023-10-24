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
      verification_submitted
      rating
      num_ratings
      num_views
      ratings {
        id
        rating
        user_id
        decoration_id
      }
      creator_id
    }
  }
`;
