import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import EmailVerification from "../pages/EmailVerification";
import Logout from "../pages/Logout";
import ResendEmailVerification from "../pages/ResendEmailVerification";
// Later add resend email verification route

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/verifyEmail/:token" element={<EmailVerification />} />
      <Route
        path="/resendVerificationEmail"
        element={<ResendEmailVerification />}
      />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default AuthRoutes;
