import { Decoration, Rating, Route } from "@/lib/types";

export interface Get_User {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  imageId: string | null;
  image: string;
  provider: string;
  premium: boolean;
  isAdmin: boolean;
  ratings: Rating[];
  decorations: Decoration[];
  favourites: Decoration[];
  history: Decoration[];
  routes: Route[];
  notifications_on_app_verification: boolean;
  notifications_on_app_rating: boolean;
  notifications_by_email_verification: boolean;
  notifications_by_email_rating: boolean;
}

export interface GetUser {
  getUser: Get_User;
}

export interface GetUserInput {
  id: string;
}

export interface GetUserArgs {
  input: GetUserInput;
}
