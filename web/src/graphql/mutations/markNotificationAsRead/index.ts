import { gql } from "@apollo/client";

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation markNotificationAsRead($input: MutateNotificationInput!) {
    markNotificationAsRead(input: $input) {
      id
    }
  }
`;
