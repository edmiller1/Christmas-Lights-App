import { gql } from "@apollo/client";

export const DELETE_ALL_NOTIFICATIONS = gql`
  mutation deleteAllNotifications {
    deleteAllNotifications {
      id
    }
  }
`;
