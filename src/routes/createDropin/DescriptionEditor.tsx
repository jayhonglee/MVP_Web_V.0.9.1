import { createFileRoute } from "@tanstack/react-router";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export const Route = createFileRoute("/createDropin/DescriptionEditor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SimpleEditor />;
}
