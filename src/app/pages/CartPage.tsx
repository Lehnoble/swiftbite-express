import React, { useState } from "react";
import { Link } from "react-router";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  MapPin,
  CreditCard,
  ChevronRight,
  Truck,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function CartPage() {
  const { darkMode, cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = cartTotal > 30 ? 0 : 2.99;
  const discount = promoApplied ? cartTotal * 0.5 : 0;
  const taxes = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + deliveryFee + taxes;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "SWIFTBITE50") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try SWIFTBITE50");
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  if (orderPlaced) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className={`text-3xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Order Placed!
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Your order has been confirmed and is being prepared. Estimated delivery: <strong>25–35 min</strong>
          </p>
          <div className={`rounded-2xl p-5 mb-6 text-left ${card}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 text-red-600 p-2 rounded-full">
                <Truck size={20} />
              </div>
              <div>
                <div className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Order #SBE-{Math.floor(Math.random() * 90000) + 10000}
                </div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Estimated arrival: 25–35 min</div>
              </div>
            </div>
            <div className="flex gap-2">
              {["Confirmed", "Preparing", "On the Way", "Delivered"].map((step, i) => (
                <div key={step} className="flex-1 text-center">
                  <div className={`h-1.5 rounded-full mb-2 ${i <= 1 ? "bg-red-600" : darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                  <div className={`text-xs ${i <= 1 ? "text-red-600 font-semibold" : darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link
              to="/orders"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/menu"
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className="text-7xl mb-5">🛒</div>
          <h2 className={`text-2xl font-black mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Your cart is empty
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/menu"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
          >
            Browse Menu <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>
              Your Cart
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your order
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1.5 transition-colors"
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address */}
            <div className={`rounded-2xl p-5 ${card}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-2 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Delivery Address
                    </div>
                    <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      123 Main St, New York, NY 10001
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">
                  Change
                </button>
              </div>
            </div>

            {/* Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 p-5 rounded-2xl transition-all ${card}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-bold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        from {item.restaurant}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          darkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className={`w-6 text-center text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="text-red-600 font-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className={`rounded-2xl p-5 ${card}`}>
              <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <Tag size={16} className="text-red-500" />
                Promo Code
              </h3>
              {promoApplied ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400 text-sm font-semibold">
                  ✅ Code SWIFTBITE50 applied — 50% off!
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter promo code"
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 text-white placeholder:text-gray-500 border border-gray-600"
                        : "bg-gray-50 text-gray-700 placeholder:text-gray-400 border border-gray-200"
                    }`}
                  />
                  <button
                    onClick={handlePromo}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-red-500 text-xs mt-2">{promoError}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl p-6 sticky top-20 ${card}`}>
              <h2 className={`text-lg font-black mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className={`flex justify-between text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo Discount (50%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className={`flex justify-between text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span>Delivery fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className={`flex justify-between text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span>Taxes (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className={`pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className={`flex justify-between font-black text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span>Total</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {cartTotal > 30 && (
                <div className={`text-xs mb-4 px-3 py-2 rounded-lg ${darkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-700"}`}>
                  🎉 You qualify for free delivery!
                </div>
              )}

              {/* Payment Method */}
              <div className={`flex items-center gap-3 p-3 rounded-xl mb-4 cursor-pointer ${darkMode ? "bg-gray-700" : "bg-gray-50 border border-gray-200"}`}>
                <CreditCard size={18} className="text-red-500" />
                <div className="flex-1">
                  <div className={`text-xs font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Credit Card</div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>•••• •••• •••• 4242</div>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Place Order — ${total.toFixed(2)}
                <ArrowRight size={18} />
              </button>

              <p className={`text-xs text-center mt-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Estimated delivery: 25–35 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
