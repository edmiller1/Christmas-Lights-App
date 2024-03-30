export interface Delete_Notification {
  __typename: "User";
  id: string;
}

export interface DeleteNotification {
  deleteNotification: Delete_Notification;
}

export interface DeleteNotificationInput {
  id: string;
}

export interface DeleteNotificationArgs {
  input: DeleteNotificationInput;
}
