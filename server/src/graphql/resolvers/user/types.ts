export interface KindeAuthResult {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface SignInArgs {
  input: { result: KindeAuthResult };
}

export interface GetUserArgs {
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

export interface SearchUserfavouritesArgs {
  input: {
    searchTerm: string;
  };
}

export interface SearchArgs {
  input: {
    searchTerm: string;
  };
}

export interface DeleteAccountArgs {
  input: {
    userId: string;
  };
}

export interface CreateSubscriptionSessionArgs {
  input: {
    cancelUrl: string;
  };
}
