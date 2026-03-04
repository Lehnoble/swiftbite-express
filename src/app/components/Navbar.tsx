import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ShoppingCart,
  Moon,
  Sun,
  Zap,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Navbar() {
  const { darkMode, toggleDarkMode, cartCount } = useApp();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/orders", label: "My Orders" },
    { to: "/about", label: "About Us" },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav
      className={`sticky top-0 z-50 w-full shadow-md transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white border-b border-gray-700"
          : "bg-white text-gray-900 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-red-600 text-white rounded-xl p-1.5 shadow-lg group-hover:bg-red-700 transition-colors">
              <Zap size={20} fill="white" />
            </div>
            <div>
              <span className="text-red-600 font-black text-lg tracking-tight">SwiftBite</span>
              <span className={`font-black text-lg tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}> Express</span>
            </div>
          </Link>

          {/* Location bar */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
              darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
          >
            <MapPin size={14} className="text-red-500" />
            <span>New York, NY</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(link.to)
                    ? "text-red-600"
                    : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-full transition-colors ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t px-4 py-4 flex flex-col gap-3 ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-red-600 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
