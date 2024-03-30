export interface Mark_Notification_As_Unread {
  __typename: "User";
  id: string;
}

export interface MarkNotificationAsUnread {
  markNotificationAsUnread: Mark_Notification_As_Unread;
}

export interface MarkNotificationAsUnreadInput {
  id: string;
}

export interface MarkNotificationAUnreadArgs {
  input: MarkNotificationAsUnreadInput;
}
