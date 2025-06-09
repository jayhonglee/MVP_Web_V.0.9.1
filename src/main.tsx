import "./index.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider } from "./context/auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the route tree from the root file
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Add type definition for search params
declare module "@tanstack/react-router" {
  interface Register {
    router: {
      search: {
        id: string;
      };
    };
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}
