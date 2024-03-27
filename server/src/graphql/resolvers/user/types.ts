export interface KindeAuthResult {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  provider: string;
}

export interface SignInArgs {
  input: { result: KindeAuthResult };
}

export interface CreateUserArgs {
  input: {
    id: string;
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

export interface getUserNotificationsArgs {
  input: {
    id: string;
  };
}

export interface getUnreadNotificationsArgs {
  input: {
    id: string;
  };
}

export interface EditAvatarArgs {
  input: {
    userId: string;
    image: string;
    imageId: string;
  };
}

export interface EditNameArgs {
  input: {
    userId: string;
    name: string;
  };
}

export interface mutateNotficationSettingsArgs {
  input: {
    userId: string;
    setting: boolean;
    name: string;
  };
}

export interface SearchUserfavouritesArgs {
  input: {
    userId: string;
    searchTerm: string;
  };
}

export interface SearchArgs {
  input: {
    searchTerm: string;
  };
}
