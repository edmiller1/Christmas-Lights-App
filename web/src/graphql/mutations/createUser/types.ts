export interface Create_User {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface CreateUser {
  createUser: Create_User;
}

export interface CreateUserInput {
  id: string;
  name: string;
  image: string;
  email: string;
  token: string;
  provider?: string;
  createdAt: string;
}

export interface CreateUserArgs {
  input: CreateUserInput;
}
