import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function ProtectedRoute() {
  const { user, isPending } = useAuth() || {};

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
