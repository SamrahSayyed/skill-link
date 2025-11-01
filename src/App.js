// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import PostCreationPage from "./pages/PostCreationPage";

import Layout from "./components/Layout";
import { useUser } from "./context/UserContext";

/**
 * Protected route - renders element only if user exists, else redirect to login
 */
function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout showFooter={true}><LandingPage /></Layout>} />
      <Route path="/login" element={<Layout showFooter={false}><LoginPage /></Layout>} />
      <Route path="/signup" element={<Layout showFooter={false}><SignUpPage /></Layout>} />

      <Route path="/dashboard" element={<Layout showFooter={false} useDefaultNavbar={false}><ProtectedRoute><DashboardPage /></ProtectedRoute></Layout>} />
      <Route path="/profile" element={<Layout showFooter={false} useDefaultNavbar={false}><ProtectedRoute><ProfilePage /></ProtectedRoute></Layout>} />
      <Route path="/profile/:id" element={
  <Layout showFooter={false} useDefaultNavbar={false}>
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  </Layout>
} />
      <Route path="/connections" element={<Layout showFooter={false} useDefaultNavbar={false}><ProtectedRoute><ConnectionsPage /></ProtectedRoute></Layout>} />
      <Route path="/create-post" element={<ProtectedRoute><PostCreationPage /></ProtectedRoute>}
/>


      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
