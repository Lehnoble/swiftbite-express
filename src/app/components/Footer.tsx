import React from "react";
import { Link } from "react-router";
import { Zap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { darkMode } = useApp();

  return (
    <footer
      className={`transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-300 border-t border-gray-800" : "bg-gray-900 text-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-red-600 text-white rounded-xl p-1.5">
                <Zap size={20} fill="white" />
              </div>
              <div>
                <span className="text-red-500 font-black text-lg">SwiftBite</span>
                <span className="text-white font-black text-lg"> Express</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Delivering happiness to your doorstep. Hot, fresh, and fast every time.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-gray-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Browse Menu" },
                { to: "/orders", label: "Track Order" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Cuisines</h3>
            <ul className="space-y-2.5">
              {["Burgers", "Pizza", "Sushi", "Mexican", "Indian", "Salads", "Desserts"].map((item) => (
                <li key={item}>
                  <Link
                    to="/menu"
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="text-red-500 mt-0.5 shrink-0" />
                123 Delivery Lane, New York, NY 10001
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="text-red-500 shrink-0" />
                +1 (800) SWIFT-BITE
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="text-red-500 shrink-0" />
                hello@swiftbiteexpress.com
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2">Download our app</p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                  App Store
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 ${darkMode ? "border-gray-800" : "border-gray-800"}`}>
          <p className="text-xs text-gray-500">
            © 2026 SwiftBite Express. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
