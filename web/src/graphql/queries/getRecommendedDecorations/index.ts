import { gql } from "@apollo/client";

export const GET_RECOMMENDED_DECORATIONS = gql`
  query getRecommendedDecorations($input: GetRecommendedDecorationsInput!) {
    getRecommendedDecorations(input: $input) {
      id
      name
      city
      country
      rating
      images {
        id
        url
      }
    }
  }
`;
