import { Decoration } from "@/lib/types";

export interface Get_User_Decorations {
  __typename: "User";
  id: string;
  name: string;
  decorations: Decoration[];
}

export interface GetUserDecorations {
  getUserDecorations: Get_User_Decorations;
}
