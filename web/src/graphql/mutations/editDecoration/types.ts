export interface Edit_Decoration {
  id: string;
}

export interface EditDecoration {
  editDecoration: Edit_Decoration;
}

export interface EditDecorationInput {
  id: string;
  name: string;
  address: string;
  newImages?: string[];
  deletedImages?: { id: string; url: string }[];
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
}

export interface EditDecorationArgs {
  input: EditDecorationInput;
}
