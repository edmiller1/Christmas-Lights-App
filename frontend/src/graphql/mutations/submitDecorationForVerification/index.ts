import { gql } from "@apollo/client";

export const SUBMIT_DECORATION_FOR_VERIFICATION = gql`
  mutation submitDecorationForVerification(
    $input: SubmitDecorationForVerificationInput!
  ) {
    submitDecorationForVerification(input: $input) {
      id
    }
  }
`;
