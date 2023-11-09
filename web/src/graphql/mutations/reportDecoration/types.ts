export interface Report_Decoration {
  __typename: "Decoration";
  id: string;
}

export interface ReportDecoration {
  reportDecoration: Report_Decoration;
}

export interface ReporrtDecorationInput {
  id: string;
  reportOptions: string[];
  additionalDetails?: string;
}

export interface ReportDecorationArgs {
  input: ReporrtDecorationInput;
}
