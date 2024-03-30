import { gql } from "@apollo/client";

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($input: MutateNotificationInput!) {
    deleteNotification(input: $input) {
      id
    }
  }
`;
