import React, { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Star,
  Clock,
  ChevronRight,
  Truck,
  Shield,
  ThumbsUp,
  ArrowRight,
  Flame,
  MapPin,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const RESTAURANTS = [
  {
    id: "1",
    name: "Burger Barn",
    cuisine: "American, Burgers",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "Popular",
    minOrder: 10,
  },
  {
    id: "2",
    name: "Pizza Palace",
    cuisine: "Italian, Pizza",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 0,
    image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "Free Delivery",
    minOrder: 15,
  },
  {
    id: "3",
    name: "Sushi Sakura",
    cuisine: "Japanese, Sushi",
    rating: 4.9,
    deliveryTime: "30-45 min",
    deliveryFee: 2.49,
    image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "Top Rated",
    minOrder: 20,
  },
  {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 0.99,
    image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "New",
    minOrder: 12,
  },
  {
    id: "5",
    name: "Crispy Cluck",
    cuisine: "American, Fried Chicken",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 1.49,
    image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "Popular",
    minOrder: 10,
  },
  {
    id: "6",
    name: "Spice Garden",
    cuisine: "Indian, Curry",
    rating: 4.6,
    deliveryTime: "35-50 min",
    deliveryFee: 1.99,
    image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    badge: "Spicy",
    minOrder: 18,
  },
];

const CATEGORIES = [
  { label: "Burgers", emoji: "🍔" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Sushi", emoji: "🍣" },
  { label: "Mexican", emoji: "🌮" },
  { label: "Chicken", emoji: "🍗" },
  { label: "Salads", emoji: "🥗" },
  { label: "Desserts", emoji: "🍰" },
  { label: "Pasta", emoji: "🍝" },
];

const BADGE_COLORS: Record<string, string> = {
  Popular: "bg-orange-500",
  "Free Delivery": "bg-green-500",
  "Top Rated": "bg-blue-500",
  New: "bg-purple-500",
  Spicy: "bg-red-600",
};

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Browse Restaurants",
    desc: "Search from hundreds of local restaurants and cuisines near you.",
    step: "01",
  },
  {
    icon: ThumbsUp,
    title: "Choose Your Meal",
    desc: "Pick your favorite dishes and customize to your taste.",
    step: "02",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Your food is picked up and delivered fresh to your door.",
    step: "03",
  },
  {
    icon: Shield,
    title: "Enjoy & Relax",
    desc: "Sit back and enjoy your meal. Safe, hot, and delicious.",
    step: "04",
  },
];

export function HomePage() {
  const { darkMode, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  return (
    <div className={`transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-5">
              <Flame size={14} className="text-yellow-300" />
              <span>Free delivery on your first order!</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Delicious Food,
              <br />
              <span className="text-yellow-300">Delivered Fast.</span>
            </h1>
            <p className="text-red-100 text-lg mb-8 max-w-md leading-relaxed">
              Order from top-rated restaurants near you and get fresh, hot meals delivered to your door in 30 minutes or less.
            </p>

            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-lg">
              <div className="flex items-center gap-2 px-3 flex-1">
                <MapPin size={18} className="text-red-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your delivery address..."
                  className="flex-1 outline-none text-gray-700 text-sm bg-transparent placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                <Search size={16} />
                Find Food
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-300">500+</div>
                <div className="text-xs text-red-200">Restaurants</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-300">30min</div>
                <div className="text-xs text-red-200">Avg Delivery</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-300">4.8★</div>
                <div className="text-xs text-red-200">App Rating</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1626842514556-057dbce0379d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Delicious food"
                className="w-72 h-72 object-cover rounded-full shadow-2xl"
              />
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-2xl p-3 shadow-xl flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-xs font-bold">Top Rated</div>
                  <div className="text-xs text-gray-500">4.9 rating</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-2xl p-3 shadow-xl flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="text-xs font-bold">Fast Delivery</div>
                  <div className="text-xs text-gray-500">25 min avg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-10 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            What are you craving?
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === "All"
                  ? "bg-red-600 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeCategory === cat.label
                    ? "bg-red-600 text-white"
                    : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className={`py-12 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>
                Featured Restaurants
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Top picks near you
              </p>
            </div>
            <Link
              to="/menu"
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESTAURANTS.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${
                      BADGE_COLORS[restaurant.badge] || "bg-red-600"
                    }`}
                  >
                    {restaurant.badge}
                  </span>
                  {restaurant.deliveryFee === 0 && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      Free Delivery
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-base mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {restaurant.name}
                  </h3>
                  <p className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {restaurant.cuisine}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {restaurant.rating}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <Clock size={13} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {restaurant.deliveryFee === 0
                        ? "Free delivery"
                        : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
            <div className="relative px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-yellow-300 text-sm font-semibold mb-2">🎉 Limited Time Offer</div>
                <h2 className="text-white text-3xl font-black mb-2">
                  50% OFF Your First 3 Orders!
                </h2>
                <p className="text-red-100 max-w-md">
                  Use code <span className="bg-white/20 text-white font-bold px-2 py-0.5 rounded-md">SWIFTBITE50</span> at checkout. Valid for new users only.
                </p>
              </div>
              <Link
                to="/menu"
                className="shrink-0 bg-white text-red-600 hover:bg-yellow-300 hover:text-red-700 font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg"
              >
                Order Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              How SwiftBite Works
            </h2>
            <p className={`max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Getting your favorite food delivered has never been easier. Follow these simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 text-center relative ${
                  darkMode ? "bg-gray-800" : "bg-red-50"
                }`}
              >
                <div className="absolute top-4 right-4 text-4xl font-black text-red-600 opacity-20">
                  {step.step}
                </div>
                <div className="bg-red-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon size={22} />
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                avatar: "😊",
                review: "SwiftBite Express is amazing! Food always arrives hot and on time. Best delivery app I've used.",
                rating: 5,
                location: "New York, NY",
              },
              {
                name: "James T.",
                avatar: "🙌",
                review: "The variety of restaurants is incredible. I can always find exactly what I'm craving at any time of day.",
                rating: 5,
                location: "Brooklyn, NY",
              },
              {
                name: "Priya K.",
                avatar: "❤️",
                review: "Fast delivery, great customer service, and the app is so easy to use. Highly recommend SwiftBite!",
                rating: 5,
                location: "Queens, NY",
              },
            ].map((t, i) => (
              <div key={i} className={`p-6 rounded-2xl ${card}`}>
                <div className="flex gap-1 mb-3">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-10 text-center ${darkMode ? "bg-gray-800" : "bg-red-50"}`}>
            <div className="text-5xl mb-4">📱</div>
            <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Get the SwiftBite App
            </h2>
            <p className={`max-w-md mx-auto mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Download our app for exclusive deals, faster ordering, and real-time delivery tracking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
