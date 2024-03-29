import { gql } from "@apollo/client";

export const GET_USER_NOTIFICATIONS = gql`
  query getUserNotifications($input: GetUserNotificationsInput!) {
    getUserNotifications(input: $input) {
      id
      title
      body
      unread
      created_at
    }
  }
`;
