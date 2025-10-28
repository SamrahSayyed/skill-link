// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, showFooter = true, useDefaultNavbar = true }) {
  return (
    <div className="flex flex-col min-h-screen">
      {useDefaultNavbar && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
