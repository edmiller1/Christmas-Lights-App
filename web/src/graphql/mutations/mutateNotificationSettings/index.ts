import { gql } from "@apollo/client";

export const MUTATE_NOTIFICATION_SETTINGS = gql`
  mutation mutateNotficationSettings($input: MutateNotificationSettingsInput!) {
    mutateNotficationSettings(input: $input) {
      id
    }
  }
`;
