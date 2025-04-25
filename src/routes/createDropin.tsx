import { createFileRoute } from "@tanstack/react-router";
import { SimpleEditor } from "../components/tiptap-templates/simple/simple-editor";
import CreateDropinHeader from "@/components/CreateDropinHeader";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  return (
    <div className="bg-[#f4f4f4] w-[100vw]">
      <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
        {/* Header */}
        <CreateDropinHeader />

        {/* Divider */}
        <hr />

        {/* Editor */}
        <SimpleEditor />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/createDropin")({
  component: RouteComponent,
  validateSearch: () => ({}),
});
