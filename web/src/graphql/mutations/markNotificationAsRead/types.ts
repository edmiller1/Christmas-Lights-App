export interface Mark_Notification_As_Read {
  __typename: "User";
  id: string;
}

export interface MarkNotificationAsRead {
  markNotificationAsRead: Mark_Notification_As_Read;
}

export interface MarkNotificationAsReadInput {
  id: string;
}

export interface MarkNotificationAsReadArgs {
  input: MarkNotificationAsReadInput;
}
