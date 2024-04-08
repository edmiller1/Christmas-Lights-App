export interface Mutate_Notification_Settings {
  __typename: "User";
  id: string;
}

export interface MutateNotificationSettings {
  mutateNotificationSettings: Mutate_Notification_Settings;
}

export interface MutateNotificationSettingsInput {
  name: string;
  setting: boolean;
}

export interface MutateNotificationSettingsArgs {
  input: MutateNotificationSettingsInput;
}
