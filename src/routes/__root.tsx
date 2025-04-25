import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Route as IndexRoute } from "./index";
import { Route as LoginRoute } from "./login";
import { Route as DropinRoute } from "./dropin";
import { Route as CreateDropinRoute } from "./createDropin";

export const Route = createRootRoute({
  component: () => <Outlet />,
});

export const routeTree = Route.addChildren([
  IndexRoute,
  LoginRoute,
  DropinRoute,
  CreateDropinRoute,
]);
