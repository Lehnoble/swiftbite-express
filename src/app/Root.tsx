import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AppProvider, useApp } from "./context/AppContext";

function Layout() {
  const { darkMode } = useApp();
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-white"}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function Root() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
