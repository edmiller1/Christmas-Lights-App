export interface Add_Decoration_To_Route {
  __typename: "User";
  id: string;
}

export interface AddDecorationToRoute {
  addDecorationToRoute: Add_Decoration_To_Route;
}

export interface AddDecorationToRouteInput {
  routeId: string;
  decorationId: string;
}

export interface AddDecorationToRouteArgs {
  input: AddDecorationToRouteInput;
}
