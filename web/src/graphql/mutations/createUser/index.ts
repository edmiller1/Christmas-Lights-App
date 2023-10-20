import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      image
    }
  }
`;
