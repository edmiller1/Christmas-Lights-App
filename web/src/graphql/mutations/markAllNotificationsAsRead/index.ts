import { gql } from "@apollo/client";

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation markAllNotificationsAsRead {
    markAllNotificationsAsRead {
      id
    }
  }
`;
