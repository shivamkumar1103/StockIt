import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../features/auth/routes/ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
import AuthRoutes from "../features/auth/routes/AuthRoutes";
import Dashboard from "../features/dashboard/pages/DashBoard";
import Portfolio from "../features/portfolio/pages/Portfolio";
import StockDetail from "../features/stockDetail/pages/StockDetail";
import News from "../features/news/pages/News";
import Settings from "../pages/Settings";
import Layout from "../layouts/Layout";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* Protected Wrapper Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* All routes nested inside here require an authenticated session */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="settings" element={<Settings />} />
              <Route path="stocks/:symbol" element={<StockDetail />} />
              <Route path="news" element={<News />} />

              {/* Additional layout routes can be added here */}
            </Route>

            {/* Redirect root "/" to dashboard if logged in */}
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
