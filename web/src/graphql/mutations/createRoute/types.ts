export interface Create_Route {
  __typename: "User";
  id: string;
}

export interface CreateRoute {
  createRoute: Create_Route;
}

export interface CreateRouteInput {
  name: string;
  decorationId?: string;
}

export interface CreateRouteArgs {
  input: CreateRouteInput;
}
