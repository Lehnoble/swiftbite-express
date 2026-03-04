import React, { useState } from "react";
import { Link } from "react-router";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  Star,
  RefreshCw,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const ORDERS = [
  {
    id: "SBE-48271",
    restaurant: "Burger Barn",
    restaurantId: "1",
    date: "Today, 2:15 PM",
    status: "on-the-way",
    items: [
      { name: "Classic Cheeseburger", qty: 2, price: 12.99 },
      { name: "Crispy Fries", qty: 1, price: 4.99 },
    ],
    total: 30.97,
    deliveryAddress: "123 Main St, New York",
    estimatedTime: "8 min",
  },
  {
    id: "SBE-47823",
    restaurant: "Pizza Palace",
    restaurantId: "2",
    date: "Yesterday, 7:30 PM",
    status: "delivered",
    items: [
      { name: "Margherita Pizza", qty: 1, price: 15.99 },
      { name: "Pepperoni Pizza", qty: 1, price: 17.99 },
      { name: "Spaghetti Carbonara", qty: 1, price: 16.99 },
    ],
    total: 54.97,
    deliveryAddress: "123 Main St, New York",
    estimatedTime: null,
  },
  {
    id: "SBE-47101",
    restaurant: "Sushi Sakura",
    restaurantId: "3",
    date: "Mar 2, 1:00 PM",
    status: "delivered",
    items: [
      { name: "Salmon Nigiri Set", qty: 2, price: 22.99 },
      { name: "Dragon Roll", qty: 1, price: 18.99 },
    ],
    total: 68.97,
    deliveryAddress: "123 Main St, New York",
    estimatedTime: null,
  },
  {
    id: "SBE-46890",
    restaurant: "Taco Fiesta",
    restaurantId: "4",
    date: "Feb 28, 6:45 PM",
    status: "cancelled",
    items: [
      { name: "Street Tacos (3pc)", qty: 3, price: 10.99 },
    ],
    total: 36.96,
    deliveryAddress: "123 Main St, New York",
    estimatedTime: null,
  },
];

const STATUS_CONFIG: Record<string, {
  label: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  steps: string[];
  activeStep: number;
}> = {
  "on-the-way": {
    label: "On the Way",
    color: "blue",
    icon: Truck,
    steps: ["Confirmed", "Preparing", "On the Way", "Delivered"],
    activeStep: 2,
  },
  "preparing": {
    label: "Preparing",
    color: "orange",
    icon: ChefHat,
    steps: ["Confirmed", "Preparing", "On the Way", "Delivered"],
    activeStep: 1,
  },
  "delivered": {
    label: "Delivered",
    color: "green",
    icon: CheckCircle,
    steps: ["Confirmed", "Preparing", "On the Way", "Delivered"],
    activeStep: 3,
  },
  "cancelled": {
    label: "Cancelled",
    color: "red",
    icon: Package,
    steps: [],
    activeStep: -1,
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status];
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${colorMap[config.color]}`}>
      <config.icon size={11} />
      {config.label}
    </span>
  );
}

export function OrdersPage() {
  const { darkMode } = useApp();
  const [expandedOrder, setExpandedOrder] = useState<string>("SBE-48271");
  const [filter, setFilter] = useState("All");
  const [rated, setRated] = useState<Record<string, number>>({});

  const filters = ["All", "Active", "Delivered", "Cancelled"];

  const filteredOrders = ORDERS.filter((order) => {
    if (filter === "All") return true;
    if (filter === "Active") return order.status === "on-the-way" || order.status === "preparing";
    if (filter === "Delivered") return order.status === "delivered";
    if (filter === "Cancelled") return order.status === "cancelled";
    return true;
  });

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black mb-1">My Orders</h1>
          <p className="text-red-100">Track and manage your food orders</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-red-600 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = STATUS_CONFIG[order.status];
            const isExpanded = expandedOrder === order.id;
            const isDelivered = order.status === "delivered";
            const isActive = order.status === "on-the-way" || order.status === "preparing";

            return (
              <div key={order.id} className={`rounded-2xl overflow-hidden transition-all ${card}`}>
                {/* Order Header */}
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedOrder(isExpanded ? "" : order.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2.5 rounded-xl ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "on-the-way"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-600"
                      }`}>
                        <config.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-black ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {order.restaurant}
                          </span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          #{order.id} · {order.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-red-600 font-black">${order.total.toFixed(2)}</span>
                      {isExpanded ? (
                        <ChevronUp size={18} className={darkMode ? "text-gray-400" : "text-gray-400"} />
                      ) : (
                        <ChevronDown size={18} className={darkMode ? "text-gray-400" : "text-gray-400"} />
                      )}
                    </div>
                  </div>

                  {/* Tracking progress for active orders */}
                  {isActive && !isExpanded && (
                    <div className="mt-4">
                      <div className="flex gap-1.5">
                        {config.steps.map((step, i) => (
                          <div key={step} className="flex-1 text-center">
                            <div className={`h-1.5 rounded-full mb-1 transition-colors ${
                              i <= config.activeStep ? "bg-red-600" : darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`} />
                            <div className={`text-xs ${
                              i <= config.activeStep
                                ? "text-red-600 font-semibold"
                                : darkMode ? "text-gray-500" : "text-gray-400"
                            }`}>
                              {step}
                            </div>
                          </div>
                        ))}
                      </div>
                      {order.estimatedTime && (
                        <div className="flex items-center gap-1.5 mt-3 text-sm text-blue-600 font-semibold">
                          <Clock size={14} />
                          Arriving in approximately {order.estimatedTime}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`border-t px-5 pb-5 pt-4 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    {/* Tracking Progress */}
                    {isActive && (
                      <div className="mb-5">
                        <h4 className={`text-sm font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Order Tracking
                        </h4>
                        <div className="flex gap-1.5 mb-2">
                          {config.steps.map((step, i) => (
                            <div key={step} className="flex-1 text-center">
                              <div className={`h-2 rounded-full mb-1 transition-colors ${
                                i <= config.activeStep ? "bg-red-600" : darkMode ? "bg-gray-700" : "bg-gray-200"
                              }`} />
                              <div className={`text-xs ${
                                i <= config.activeStep
                                  ? "text-red-600 font-semibold"
                                  : darkMode ? "text-gray-500" : "text-gray-400"
                              }`}>
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>
                        {order.estimatedTime && (
                          <div className={`flex items-center gap-2 text-sm mt-3 p-3 rounded-xl ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700"}`}>
                            <Truck size={15} />
                            <span>Your rider is on the way! Arriving in <strong>{order.estimatedTime}</strong></span>
                          </div>
                        )}
                        <div className={`flex items-center gap-2 text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <MapPin size={13} className="text-red-500" />
                          Delivering to: {order.deliveryAddress}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <h4 className={`text-sm font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Items Ordered
                    </h4>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className={`flex justify-between text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>{item.qty}x {item.name}</span>
                          <span className="font-medium">${(item.qty * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className={`flex justify-between font-bold pt-2 border-t text-sm ${darkMode ? "border-gray-700 text-white" : "border-gray-100 text-gray-900"}`}>
                        <span>Total</span>
                        <span className="text-red-600">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Rating for delivered orders */}
                    {isDelivered && (
                      <div className={`p-4 rounded-xl mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Rate your order
                        </p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRated((prev) => ({ ...prev, [order.id]: star }))}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                size={22}
                                className={rated[order.id] >= star ? "text-yellow-400" : "text-gray-300"}
                                fill={rated[order.id] >= star ? "currentColor" : "none"}
                              />
                            </button>
                          ))}
                          {rated[order.id] && (
                            <span className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Thanks for rating!
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {isDelivered && (
                        <Link
                          to={`/restaurant/${order.restaurantId}`}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                        >
                          <RefreshCw size={15} /> Reorder
                        </Link>
                      )}
                      <Link
                        to={`/restaurant/${order.restaurantId}`}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        View Restaurant
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                No orders found
              </h3>
              <p className={`mb-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                You don't have any {filter.toLowerCase()} orders yet.
              </p>
              <Link
                to="/menu"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Start Ordering
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
