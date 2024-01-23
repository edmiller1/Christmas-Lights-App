export interface CreateRouteArgs {
  input: {
    name: string;
    decorationId?: string;
  };
}

export interface AddDecorationToRouteArgs {
  input: {
    routeId: string;
    decorationId: string;
  };
}

export interface RemoveDecorationFromRouteArgs {
  input: {
    routeId: string;
    decorationId: string;
  };
}
