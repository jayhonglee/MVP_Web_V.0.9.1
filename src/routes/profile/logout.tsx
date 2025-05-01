import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/logout")({
  component: Logout,
});

function Logout() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Logout</h1>
      {/* Add your logout content here */}
    </div>
  );
}
