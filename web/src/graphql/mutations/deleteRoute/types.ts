export interface Delete_Route {
  __typename: "User";
  id: string;
}

export interface DeleteRoute {
  deleteRoute: Delete_Route;
}

export interface DeleteRouteInput {
  routeId: string;
}

export interface DeleteRouteArgs {
  input: DeleteRouteInput;
}
