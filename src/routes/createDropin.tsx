import { createFileRoute } from "@tanstack/react-router";
import { SimpleEditor } from "../components/tiptap-templates/simple/simple-editor";
// import HeaderWithBackBtn from "../components/HeaderWithBackBtn";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  return (
    // <div className="bg-[#f4f4f4] w-[100vw]">
    //   <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
    //     <HeaderWithBackBtn />
    <SimpleEditor />
    //   </div>
    // </div>
  );
}

export const Route = createFileRoute("/createDropin")({
  component: RouteComponent,
});
