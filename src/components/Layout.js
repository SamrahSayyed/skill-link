import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, showFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer conditional */}
      {showFooter && <Footer />}
    </div>
  );
}
