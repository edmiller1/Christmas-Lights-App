import { gql } from "@apollo/client";

export const EDIT_AVATAR = gql`
  mutation editAvatar($input: EditAvatarInput!) {
    editAvatar(input: $input) {
      id
    }
  }
`;
