import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
