import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddInvestmentPage from "./pages/AddInvestmentPage";
import ViewInvestmentsPage from "./pages/ViewInvestmentsPage";
import HistoryPage from "./pages/HistoryPage";
import OtpPage from "./pages/OtpPage";

// Extra pages for footer links
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { token, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <BrowserRouter>
      {/* Header always visible */}
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddInvestmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              <ViewInvestmentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />

        {/* Footer Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
}
