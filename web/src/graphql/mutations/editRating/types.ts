export interface Edit_Rating {
  __typename: "User";
  id: string;
}

export interface EditRating {
  editRating: Edit_Rating;
}

export interface EditRatingInput {
  id: string;
  rating: number;
}

export interface EditRatingArgs {
  input: EditRatingInput;
}
