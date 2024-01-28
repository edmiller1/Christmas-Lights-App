export interface Remove_Decoration_From_Route {
  __typename: "User";
  id: string;
}

export interface RemoveDecorationFromRoute {
  removeDecorationFromRoute: Remove_Decoration_From_Route;
}
export interface RemoveDecorationFromRouteInput {
  routeId: string;
  decorationId: string;
}

export interface RemoveDecorationfromRouteArgs {
  input: RemoveDecorationFromRouteInput;
}
