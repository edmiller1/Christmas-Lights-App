export interface FirebaseAuthResult {
  uid: string;
  accessToken: string;
  isNewUser: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
}

export interface SignInArgs {
  input: { result: FirebaseAuthResult };
}

export interface CreateUserArgs {
  input: {
    id: string;
    token: string;
    email: string;
    image: string;
    name: string;
    provider: string;
  };
}

export interface GetUserArgs {
  input: {
    id: string;
  };
}

export interface EditAvatarArgs {
  input: {
    image: string;
    imageId: string;
  };
}

export interface EditNameArgs {
  input: {
    name: string;
  };
}

export interface mutateNotficationSettingsArgs {
  input: {
    setting: boolean;
    name: string;
  };
}
