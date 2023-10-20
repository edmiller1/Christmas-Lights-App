export interface Create_Decoration {
  __typename: "Decoration";
  id: string;
}

export interface CreateDecoration {
  createDecoration: Create_Decoration;
}

export interface CreateDecorationInput {
  name: string;
  address: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  images: string[];
}

export interface CreateDecorationArgs {
  input: CreateDecorationInput;
}
