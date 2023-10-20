export interface Get_User {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  image: string;
  provider: string;
  premium: boolean;
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
