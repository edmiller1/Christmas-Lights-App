export interface Sign_In {
  __typename: "User";
  id: string;
}

export interface SignIn {
  signIn: Sign_In;
}

export interface SignInInput {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface SignInArgs {
  input: {
    result: SignInInput;
  };
}
