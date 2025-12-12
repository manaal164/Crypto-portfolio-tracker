import { BrowserRouter, Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <BrowserRouter>
      {/* Header visible on all pages */}
      <Header />

      {/* Application Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />

        {/* Protected Routes (only accessible if logged in) */}
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
      </Routes>

      {/* Footer visible on all pages */}
    //  <Footer />
    </BrowserRouter>
  );
}
