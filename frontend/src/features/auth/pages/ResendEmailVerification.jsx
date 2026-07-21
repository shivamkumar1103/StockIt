import { useState } from "react";
import useResendEmailVerification from "../hooks/useResendEmailVerification";

const ResendEmailVerification = () => {
  const [email, setEmail] = useState("");
  const { resendVerificationEmail, isPending } = useResendEmailVerification();

  const handleSubmit = (e) => {
    e.preventDefault();
    resendVerificationEmail(email);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Resend Verification</h2>

        <p className="helper-text">
          Enter your email address and we'll send you a new link to verify your
          account.
        </p>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={isPending}>
          {isPending ? "Sending..." : "Send Verification Link"}
        </button>

        <div className="auth-links">
          <a href="/login">Back to Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default ResendEmailVerification;
