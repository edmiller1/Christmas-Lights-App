export interface Get_Verification_Requests {
  __typename: "Verification";
  id: string;
  document: string;
  approved: boolean;
  rejected: boolean;
  rejected_reason: boolean;
  archived: boolean;
}

export interface GetVerificationRequests {
  getVerificationRequests: Get_Verification_Requests;
}
