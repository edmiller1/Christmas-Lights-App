export interface Edit_Avatar {
  __typename: "User";
  id: string;
}

export interface EditAvatar {
  editAvatar: Edit_Avatar;
}

export interface EditAvatarInput {
  image: string;
  imageId: string | null;
}

export interface EditAvatarArgs {
  input: EditAvatarInput;
}
