import { Decoration } from "@/lib/types";

export interface Get_User_History {
  __typename: "User";
  id: string;
  name: string;
  history: Decoration[];
}

export interface GetUserHistory {
  getUserHistory: Get_User_History;
}
