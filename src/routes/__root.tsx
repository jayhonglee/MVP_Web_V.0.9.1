import { Outlet, createRootRoute } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
});

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: "/",
});

export const loginRoute = createRoute({
  getParentRoute: () => Route,
  path: "/login",
});

export const dropinRoute = createRoute({
  getParentRoute: () => Route,
  path: "/dropin",
});

export const createDropinRoute = createRoute({
  getParentRoute: () => Route,
  path: "/createDropin",
});
