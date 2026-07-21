import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Auth.css";
import useResetPassword from "../hooks/useResetPassword";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isPending, isError, error, isSuccess } =
    useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    resetPassword({
      token,
      password: newPassword,
      passwordConfirm: confirmPassword,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Set New Password</h2>

        {isSuccess ? (
          <div className="success-message">
            <p>Your password has been successfully reset!</p>
            <Link to="/auth/login" className="auth-button link-button">
              Continue to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {isError && (
              <div className="error-message">
                <p>
                  {error?.message ||
                    "Failed to reset password. The link may be expired or invalid."}
                </p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={isPending}>
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
