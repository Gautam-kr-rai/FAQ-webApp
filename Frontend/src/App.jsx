import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import { useUserStore } from "./store/useUserStore";

import SignUpPage from "./pages/SingUpPage";
import LoginPage from "./pages/LoginPage";
import LoadingSpinner from "./component/LodingSpinner";
import Welcome from "./pages/WelcomePage";
import FAQPage from "./pages/FaqPage";
import FAQForm from "./component/FAQFrom";
import FAQUpdate from "./component/FAQUpdate";

function App() {
  const { user, checkAuth, checkingAuth, logout } = useUserStore();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-black">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/singup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route path="/faq" element={user ? <FAQPage /> : <Navigate to="/login" />} />
        <Route path="/faq/create" element={user ? <FAQForm /> : <Navigate to="/login" />} />
        <Route path="/faq/:id" element={user ? <FAQUpdate /> : <Navigate to="/login" />} />

        {/* Catch-all Route (404 Not Found) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
