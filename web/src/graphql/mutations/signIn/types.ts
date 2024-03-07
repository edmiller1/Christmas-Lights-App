export interface Sign_In {
  __typename: "User";
  id: string;
  token: string;
}

export interface SignIn {
  signIn: Sign_In;
}

export interface SignInInput {
  id: string;
  token: string;
  name: string;
  email: string;
  photoURL: string;
  provider: string;
}

export interface SignInArgs {
  input: {
    result: SignInInput;
  };
}
