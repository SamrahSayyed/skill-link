// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import PostCreationPage from "./pages/PostCreationPage";
import LandingPage from "./pages/LandingPage"; // your existing LandingPage (wrapped by Layout)
import LoginPage from "./pages/LoginPage"; // if present
import SignUpPage from "./pages/SignUpPage"; // if present
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout showFooter={true}><LandingPage /></Layout>} />
        <Route path="/login" element={<Layout showFooter={false}><LoginPage /></Layout>} />
        <Route path="/signup" element={<Layout showFooter={false}><SignUpPage /></Layout>} />

        {/* Logged-in pages: Layout without default navbar, we use MiniNavbar inside pages */}
        <Route path="/dashboard" element={<Layout showFooter={false} useDefaultNavbar={false}><DashboardPage /></Layout>} />
        <Route path="/profile" element={<Layout showFooter={false} useDefaultNavbar={false}><ProfilePage /></Layout>} />
        <Route path="/connections" element={<Layout showFooter={false} useDefaultNavbar={false}><ConnectionsPage /></Layout>} />
        <Route path="/create-post" element={<Layout showFooter={false} useDefaultNavbar={false}><PostCreationPage /></Layout>} />
      </Routes>
    </Router>
  );
}
