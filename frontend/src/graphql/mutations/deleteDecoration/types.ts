export interface Delete_Decoration {
  __typename: "User";
  id: string;
}

export interface DeleteDecoration {
  deleteDecoration: Delete_Decoration;
}

export interface DeleteDecorationInput {
  decorationId: string;
}

export interface DeleteDecorationArgs {
  input: DeleteDecorationInput;
}
