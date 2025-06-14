import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, verify } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isVerified = await verify();
      if (!isVerified) {
        navigate({ to: "/login", replace: true });
      }
    };

    checkAuth();
  }, [verify, navigate]);

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
