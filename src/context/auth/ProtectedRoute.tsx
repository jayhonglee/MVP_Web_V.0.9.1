import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  console.log(isAuthenticated);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F43630]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
