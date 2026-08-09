import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useVerifyEmail from "../hooks/useVerifyEmail";
import "./Auth.css";

function EmailVerification() {
  const { token } = useParams();
  const { verifyEmail, isPending, isError, error, isSuccess } =
    useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Email Verification</h2>

        {isPending && <p>Verifying your email address...</p>}

        {isSuccess && (
          <div className="success-message">
            <p>Your email has been successfully verified!</p>
            <Link to="/auth/login" className="auth-button link-button">
              Continue to Login
            </Link>
          </div>
        )}

        {isError && (
          <div className="error-message">
            <p>
              {error?.message ||
                "Verification failed. The link may be expired or invalid."}
            </p>
            <Link
              to="/auth/resendVerificationEmail"
              className="auth-button link-button"
            >
              Request new link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
