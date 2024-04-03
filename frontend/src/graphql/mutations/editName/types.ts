export interface Edit_Name {
  __typename: "User";
  id: string;
}

export interface EditName {
  editName: Edit_Name;
}

export interface EditNameInput {
  name: string;
}

export interface EditNameArgs {
  input: EditNameInput;
}
