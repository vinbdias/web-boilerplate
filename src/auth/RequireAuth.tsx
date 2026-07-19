import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useAuth } from "./AuthContext";

/** Route guard: waits for rehydration, then either renders or redirects. */
export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="splash">
        <Spinner size="lg" label="Loading session" />
      </div>
    );
  }

  if (status === "anonymous") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
