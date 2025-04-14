import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dropin")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useSearch();
  return (
    <div>
      <div>Drop-in ID: {id}</div>
    </div>
  );
}
