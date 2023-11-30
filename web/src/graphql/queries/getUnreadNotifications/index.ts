import { gql } from "@apollo/client";

export const GET_UNREAD_NOTIFICATIONS = gql`
  query getUnreadNotifications {
    getUnreadNotifications
  }
`;
