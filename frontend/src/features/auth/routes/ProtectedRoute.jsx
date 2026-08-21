import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

function ProtectedRoute() {
  const { user, isPending } = useAuth() || {};

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <p className="text-muted-foreground text-sm font-medium">Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
