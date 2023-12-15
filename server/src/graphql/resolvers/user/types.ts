export interface CreateUserArgs {
  input: {
    id: string;
    token: string;
    email: string;
    image: string;
    name: string;
    provider: string;
    createdAt: string;
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
