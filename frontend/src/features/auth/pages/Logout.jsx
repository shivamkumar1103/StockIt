import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "./Auth.css";

/////////////////
// TEMPORARY ////
/////////////////

function Logout() {
  const { logout, isPending } = useLogout();
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isPending ? "Logging out..." : "Logged Out"}</h2>
        <p>You have been successfully logged out of your account.</p>
        <Link to="/auth/login" className="auth-button link-button">
          Return to Login
        </Link>
      </div>
    </div>
  );
}

export default Logout;
