import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../hooks/useForgotPassword";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isPending /*isError, error, isSuccess */ } =
    useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
    forgotPassword(email);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>

        <p className="helper-text">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={isPending}>
          Send Reset Link
        </button>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
