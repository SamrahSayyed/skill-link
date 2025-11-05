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
 * ✅ Waits for user context to load
 */
function ProtectedRoute({ children }) {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showFooter={true}>
            <LandingPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout showFooter={false}>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout showFooter={false}>
            <SignUpPage />
          </Layout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Layout showFooter={false} useDefaultNavbar={false}>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout showFooter={false} useDefaultNavbar={false}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Layout showFooter={false} useDefaultNavbar={false}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/connections"
        element={
          <Layout showFooter={false} useDefaultNavbar={false}>
            <ProtectedRoute>
              <ConnectionsPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/create-post"
        element={
          <Layout showFooter={false} useDefaultNavbar={false}>
            <ProtectedRoute>
              <PostCreationPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
