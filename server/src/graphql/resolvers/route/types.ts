export interface CreateRouteArgs {
  input: {
    userId: string;
    name: string;
    decorationId?: string;
  };
}

export interface AddDecorationToRouteArgs {
  input: {
    userId: string;
    routeId: string;
    decorationId: string;
  };
}

export interface RemoveDecorationFromRouteArgs {
  input: {
    userId: string;
    routeId: string;
    decorationId: string;
  };
}

export interface DeleteRouteArgs {
  input: {
    userId: string;
    routeId: string;
  };
}
