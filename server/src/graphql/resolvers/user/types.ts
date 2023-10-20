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
