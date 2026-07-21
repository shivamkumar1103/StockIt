import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../features/auth/routes/ProtectedRoute";
import AuthProvider from "../features/auth/context/AuthProvider";
import AuthRoutes from "../features/auth/routes/AuthRoutes";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* 🔐 Protected Wrapper Route */}
          <Route element={<ProtectedRoute />}>
            {/* All routes nested inside here require an authenticated session */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />

            {/* Optional: Redirect root "/" to dashboard if logged in */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Catch-all 404 handler */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
