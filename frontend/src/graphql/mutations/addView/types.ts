export interface Add_View {
  __typename: "Decoration";
  id: string;
}

export interface AddView {
  addView: Add_View;
}

export interface AddViewInput {
  id?: string;
  numViews?: number;
}

export interface AddViewArgs {
  input: AddViewInput;
}
