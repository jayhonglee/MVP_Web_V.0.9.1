import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      {/* Add your settings content here */}
    </div>
  );
}
