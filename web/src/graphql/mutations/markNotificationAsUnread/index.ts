import { gql } from "@apollo/client";

export const MARK_NOTIFICATION_AS_UNREAD = gql`
  mutation markNotificationAsUnread($input: MutateNotificationInput!) {
    markNotificationAsUnread(input: $input) {
      id
    }
  }
`;
