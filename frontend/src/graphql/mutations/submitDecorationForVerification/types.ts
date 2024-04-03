export interface Submit_Decoration_For_Verification {
  __typename: "Decoration";
  id: string;
}

export interface SubmitDecorationForVerification {
  submitDecorationForVerification: Submit_Decoration_For_Verification;
}

export interface SubmitDecorationForVerificationInput {
  id: string;
  document: string;
}

export interface SubmitDecorationForVerificationArgs {
  input: SubmitDecorationForVerificationInput;
}
