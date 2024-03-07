export interface SupabaseAuthResult {
  id: string;
  token: string;
  name: string;
  email: string;
  photoURL: string;
  provider: string;
}

export interface SignInArgs {
  input: { result: SupabaseAuthResult };
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

export interface SearchArgs {
  input: {
    searchTerm: string;
  };
}
