import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import "./Auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    signup({ name, email, password, passwordConfirm });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Added Password Confirm Field */}
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/auth/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
