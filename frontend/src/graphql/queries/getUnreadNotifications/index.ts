import { gql } from "@apollo/client";

export const GET_UNREAD_NOTIFICATIONS = gql`
  query getUnreadNotifications($input: GetUnreadNotificationsInput!) {
    getUnreadNotifications(input: $input)
  }
`;
