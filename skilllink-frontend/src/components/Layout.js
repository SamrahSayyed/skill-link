// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import MiniNavbar from "./MiniNavbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

/**
 * Layout
 * - shows MiniNavbar only on dashboard/profile/connections paths
 * - otherwise shows the main Navbar
 */
export default function Layout({ children, showFooter = true }) {
  const location = useLocation();
  const miniPaths = ["/dashboard", "/profile", "/connections"];

  // also handle path prefixes (e.g., /profile/*)
  const isMini = miniPaths.some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`));

  return (
    <div className="flex flex-col min-h-screen">
      {isMini ? <MiniNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
