export interface Sign_In {
  __typename: "User";
  id: string;
  token: string;
}

export interface SignIn {
  signIn: Sign_In;
}

export interface SignInInput {
  uid: string;
  accessToken: string;
  isNewUser: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
}

export interface SignInArgs {
  input: {
    result: SignInInput;
  };
}
