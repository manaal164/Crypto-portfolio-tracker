/*
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
    
      <Header />


      <Routes>
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />

       
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

     
    //  <Footer />
    </BrowserRouter>
  );
}

*/


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

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { token, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <BrowserRouter>
      {/* Header visible on all pages */}
      <Header />

      {/* Application Routes */}
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

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>

      {/* Footer visible on all pages */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
