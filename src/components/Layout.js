import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, showFooter = true, useDefaultNavbar = true }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditional Navbar */}
      {useDefaultNavbar && <Navbar />}

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Conditional Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
