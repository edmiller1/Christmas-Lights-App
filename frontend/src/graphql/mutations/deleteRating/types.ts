export interface Delete_Rating {
  __typename: "User";
  id: string;
}

export interface DeleteRating {
  deleteRating: Delete_Rating;
}

export interface DeleteRatingInput {
  id: string;
}

export interface DeleteRatingArgs {
  input: DeleteRatingInput;
}
