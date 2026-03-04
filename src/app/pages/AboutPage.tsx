import React from "react";
import { Link } from "react-router";
import {
  Zap,
  Users,
  MapPin,
  Award,
  Heart,
  Leaf,
  Shield,
  Clock,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const TEAM = [
  {
    name: "Kedumle Noble",
    role: "CEO & Co-Founder",
    emoji: "👨‍💼",
    bio: "Former restaurant owner turned tech entrepreneur. Kedumle founded SwiftBite with a mission to revolutionize food delivery.",
  },
  {
    name: "Samantha Chen",
    role: "CTO & Co-Founder",
    emoji: "👩‍💻",
    bio: "Ex-Google engineer passionate about using technology to create seamless food experiences for everyone.",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Operations",
    emoji: "👨‍🔧",
    bio: "10+ years in logistics, Marcus ensures every order is delivered perfectly, on time, every time.",
  },
  {
    name: "Priya Patel",
    role: "Head of Partnerships",
    emoji: "👩‍🤝‍👩",
    bio: "Building our restaurant network one partnership at a time, Priya ensures quality at every step.",
  },
];

const VALUES = [
  {
    icon: Zap,
    title: "Speed",
    desc: "We believe you shouldn't have to wait long for great food. Our optimized routing ensures swift deliveries.",
  },
  {
    icon: Heart,
    title: "Quality",
    desc: "We only partner with restaurants that meet our high standards for food quality and safety.",
  },
  {
    icon: Shield,
    title: "Trust",
    desc: "Transparent pricing, real-time tracking, and a commitment to your satisfaction and safety.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We're committed to eco-friendly packaging and carbon-neutral delivery options by 2027.",
  },
];

const MILESTONES = [
  { year: "2020", event: "SwiftBite Express founded in New York City" },
  { year: "2021", event: "Expanded to 10 cities, serving 50,000 customers" },
  { year: "2022", event: "Launched in 25 cities, partnered with 1,000+ restaurants" },
  { year: "2023", event: "Reached 1 million deliveries, launched loyalty program" },
  { year: "2024", event: "Expanded to 50 cities, introduced AI-powered recommendations" },
  { year: "2026", event: "Now serving 100+ cities with 500,000+ happy customers" },
];

export function AboutPage() {
  const { darkMode } = useApp();

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  return (
    <div className={`transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <Zap size={40} className="text-yellow-300" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            About SwiftBite Express
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to connect people with the food they love, delivered fast, fresh, and with care.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={`py-12 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100+", label: "Cities Served", icon: MapPin },
              { value: "500+", label: "Restaurant Partners", icon: Award },
              { value: "500K+", label: "Happy Customers", icon: Users },
              { value: "2M+", label: "Orders Delivered", icon: Zap },
            ].map((stat, i) => (
              <div key={i} className={`rounded-2xl p-6 text-center ${card}`}>
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={22} />
                </div>
                <div className="text-3xl font-black text-red-600 mb-1">{stat.value}</div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className={`py-16 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-black mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Our Story
              </h2>
              <div className={`space-y-4 text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <p>
                  SwiftBite Express was born in 2020 out of a simple frustration: great restaurants with amazing food were hard to access, and delivery options were slow, unreliable, and expensive.
                </p>
                <p>
                  Our founders, Kedumle and Samantha, combined their backgrounds in the restaurant industry and tech to build a platform that truly puts both customers and restaurant partners first.
                </p>
                <p>
                  Today, we're proud to be one of the fastest-growing food delivery services, operating in 100+ cities and partnering with over 500 of the best local restaurants.
                </p>
                <p>
                  Our commitment remains the same: deliver happiness one meal at a time.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1764745223157-64f76610cb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Food delivery"
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
              <div className={`absolute -bottom-4 -left-4 rounded-xl p-4 shadow-xl ${card}`}>
                <div className="text-2xl font-black text-red-600">⚡ 25 min</div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Average delivery time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Our Values
            </h2>
            <p className={`max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Everything we do is guided by these core principles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <div key={i} className={`p-6 rounded-2xl flex gap-4 ${card}`}>
                <div className="bg-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <value.icon size={22} />
                </div>
                <div>
                  <h3 className={`font-bold mb-1.5 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={`py-16 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Our Journey
            </h2>
          </div>
          <div className="relative">
            <div className={`absolute left-16 top-0 bottom-0 w-0.5 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className="space-y-6">
              {MILESTONES.map((milestone, i) => (
                <div key={i} className="flex gap-5 items-start relative">
                  <div className="text-right w-12 shrink-0">
                    <span className="text-red-600 font-black text-sm">{milestone.year}</span>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-red-600 border-4 border-white dark:border-gray-950 shadow-sm z-10 relative" />
                  </div>
                  <div className={`flex-1 pb-2 pt-0.5 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {milestone.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Meet the Team
            </h2>
            <p className={`max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              The passionate people behind SwiftBite Express.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className={`rounded-2xl p-6 text-center ${card}`}>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <h3 className={`font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {member.name}
                </h3>
                <div className="text-red-600 text-xs font-semibold mb-3">{member.role}</div>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact / CTA */}
      <div className={`py-16 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact */}
            <div className={`rounded-2xl p-8 ${card}`}>
              <h2 className={`text-2xl font-black mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Get in Touch
              </h2>
              <div className="space-y-4">
                <a href="mailto:hello@swiftbiteexpress.com" className={`flex items-center gap-3 group ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                  <div className="bg-red-100 text-red-600 p-2.5 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 mb-0.5">Email</div>
                    <div className="text-sm">hello@swiftbiteexpress.com</div>
                  </div>
                </a>
                <a href="tel:+18009483248" className={`flex items-center gap-3 group ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                  <div className="bg-red-100 text-red-600 p-2.5 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 mb-0.5">Phone</div>
                    <div className="text-sm">+1 (800) SWIFT-BITE</div>
                  </div>
                </a>
                <div className={`flex items-center gap-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <div className="bg-red-100 text-red-600 p-2.5 rounded-xl">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 mb-0.5">Support Hours</div>
                    <div className="text-sm">24/7 Live Support</div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <div className="bg-red-100 text-red-600 p-2.5 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 mb-0.5">Headquarters</div>
                    <div className="text-sm">123 Delivery Lane, New York, NY 10001</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-black mb-3">Partner With Us</h2>
              <p className="text-red-100 mb-6 text-sm leading-relaxed">
                Are you a restaurant owner? Join our network of 500+ restaurants and reach thousands of new customers every day.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "No setup fees",
                  "Real-time analytics dashboard",
                  "Dedicated account manager",
                  "Marketing support",
                ].map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-red-100">
                    <span className="text-yellow-300">✓</span> {perk}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-red-600 hover:bg-yellow-300 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Become a Partner <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className={`py-12 text-center ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Ready to Order?
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Join 500,000+ happy customers and experience the SwiftBite difference.
          </p>
          <Link
            to="/menu"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            <Zap size={20} fill="white" /> Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
