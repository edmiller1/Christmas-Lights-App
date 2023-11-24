import { Decoration } from "@/lib/types";

export interface Get_Recent_Reports {
  __typename: "Report";
  id: string;
  additionalInfo: string;
  created_at: string;
  reasons: string;
  decoration: Decoration;
}

export interface GetRecentReports {
  getRecentReports: Get_Recent_Reports;
}
