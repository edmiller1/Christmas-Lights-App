import { DecorationImage } from "@/lib/types";

export interface Get_Decoration_Verification {
  __typename: "Decoration";
  id: string;
  name: string;
  address: string;
  images: DecorationImage[];
  creator_id: string;
}

export interface GetDecorationVerification {
  getDecorationVerification: Get_Decoration_Verification;
}

export interface GetDecorationVerificationInput {
  id: string;
}

export interface GetDecorationVerificationArgs {
  input: GetDecorationVerificationInput;
}
