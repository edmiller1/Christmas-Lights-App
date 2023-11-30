import { gql } from "@apollo/client";

export const GET_USER_NOTIFICATIONS = gql`
  query getUserNotifications {
    getUserNotifications {
      id
      title
      body
      unread
      created_at
    }
  }
`;
