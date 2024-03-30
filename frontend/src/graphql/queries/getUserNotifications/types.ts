export interface Get_User_Notifications {
  __typename: "Notification";
  id: string;
  title: string;
  body: string;
  unread: boolean;
  created_at: string;
}

export interface GetUserNotifications {
  getUserNotifications: Get_User_Notifications[];
}
