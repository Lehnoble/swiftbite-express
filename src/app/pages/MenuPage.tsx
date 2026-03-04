import React, { useState } from "react";
import { Link } from "react-router";
import { Search, Star, Clock, Filter, SlidersHorizontal, Plus, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";

const ALL_ITEMS = [
  {
    id: "b1",
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: 12.99,
    rating: 4.8,
    time: "20 min",
    restaurant: "Burger Barn",
    restaurantId: "1",
    image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Double patty with cheddar, lettuce, tomato, and special sauce.",
  },
  {
    id: "b2",
    name: "BBQ Bacon Burger",
    category: "Burgers",
    price: 14.99,
    rating: 4.7,
    time: "22 min",
    restaurant: "Burger Barn",
    restaurantId: "1",
    image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: false,
    description: "Smoky BBQ sauce, crispy bacon, caramelized onions.",
  },
  {
    id: "p1",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 15.99,
    rating: 4.6,
    time: "25 min",
    restaurant: "Pizza Palace",
    restaurantId: "2",
    image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Classic tomato sauce, fresh mozzarella, and basil.",
  },
  {
    id: "p2",
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 17.99,
    rating: 4.8,
    time: "25 min",
    restaurant: "Pizza Palace",
    restaurantId: "2",
    image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Generous pepperoni with mozzarella and tomato sauce.",
  },
  {
    id: "s1",
    name: "Salmon Nigiri Set",
    category: "Sushi",
    price: 22.99,
    rating: 4.9,
    time: "30 min",
    restaurant: "Sushi Sakura",
    restaurantId: "3",
    image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "6 pieces of fresh salmon nigiri with wasabi and ginger.",
  },
  {
    id: "s2",
    name: "Dragon Roll",
    category: "Sushi",
    price: 18.99,
    rating: 4.8,
    time: "30 min",
    restaurant: "Sushi Sakura",
    restaurantId: "3",
    image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: false,
    description: "Shrimp tempura, avocado, cucumber topped with avocado.",
  },
  {
    id: "t1",
    name: "Street Tacos (3pc)",
    category: "Mexican",
    price: 10.99,
    rating: 4.5,
    time: "18 min",
    restaurant: "Taco Fiesta",
    restaurantId: "4",
    image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Corn tortillas with seasoned meat, onion, and cilantro.",
  },
  {
    id: "c1",
    name: "Crispy Fried Chicken",
    category: "Chicken",
    price: 13.99,
    rating: 4.7,
    time: "20 min",
    restaurant: "Crispy Cluck",
    restaurantId: "5",
    image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Perfectly seasoned and fried to golden perfection.",
  },
  {
    id: "sa1",
    name: "Caesar Salad",
    category: "Salads",
    price: 9.99,
    rating: 4.4,
    time: "15 min",
    restaurant: "Burger Barn",
    restaurantId: "1",
    image: "https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: false,
    description: "Romaine lettuce, croutons, parmesan, and Caesar dressing.",
  },
  {
    id: "d1",
    name: "Vanilla Ice Cream",
    category: "Desserts",
    price: 6.99,
    rating: 4.6,
    time: "10 min",
    restaurant: "Burger Barn",
    restaurantId: "1",
    image: "https://images.unsplash.com/photo-1655210909363-c2143432bccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: false,
    description: "Creamy vanilla ice cream with toppings of your choice.",
  },
  {
    id: "pa1",
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: 16.99,
    rating: 4.7,
    time: "28 min",
    restaurant: "Pizza Palace",
    restaurantId: "2",
    image: "https://images.unsplash.com/photo-1714611446679-6059b55d824e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Traditional carbonara with pancetta, egg, and pecorino.",
  },
  {
    id: "i1",
    name: "Butter Chicken",
    category: "Indian",
    price: 15.99,
    rating: 4.6,
    time: "35 min",
    restaurant: "Spice Garden",
    restaurantId: "6",
    image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    popular: true,
    description: "Tender chicken in a rich tomato-butter-cream sauce.",
  },
];

const CATEGORIES = ["All", "Burgers", "Pizza", "Sushi", "Mexican", "Chicken", "Salads", "Desserts", "Pasta", "Indian"];

const SORT_OPTIONS = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Delivery Time"];

export function MenuPage() {
  const { darkMode, addToCart } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Popular");
  const [showFilters, setShowFilters] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const filtered = ALL_ITEMS
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Rating") return b.rating - a.rating;
      if (sort === "Delivery Time") return parseInt(a.time) - parseInt(b.time);
      return b.popular ? 1 : -1;
    });

  const handleAdd = (item: (typeof ALL_ITEMS)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      restaurant: item.restaurant,
    });
    setAddedItems((prev) => new Set([...prev, item.id]));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black mb-2">Explore Our Menu</h1>
          <p className="text-red-100 mb-6">Hundreds of dishes from top-rated restaurants near you</p>
          <div className="flex items-center gap-2 bg-white rounded-xl p-2 max-w-lg shadow-lg">
            <Search size={18} className="text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search food, restaurant, cuisine..."
              className="flex-1 outline-none text-gray-700 text-sm bg-transparent placeholder:text-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                category === cat
                  ? "bg-red-600 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Filter bar */}
        <div className="flex items-center justify-between mb-6">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Showing <span className="font-bold text-red-600">{filtered.length}</span> results
          </p>
          <div className="flex items-center gap-3">
            <div className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700 border border-gray-200"
            }`}>
              <SlidersHorizontal size={15} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="outline-none bg-transparent cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="text-gray-900">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.popular && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    🔥 Popular
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`font-bold text-sm leading-tight flex-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {item.name}
                  </h3>
                </div>
                <Link
                  to={`/restaurant/${item.restaurantId}`}
                  className="text-xs text-red-500 hover:text-red-600 font-medium block mb-2"
                >
                  {item.restaurant}
                </Link>
                <p className={`text-xs mb-3 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>{item.rating}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <Clock size={12} />
                    {item.time}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-black text-lg">${item.price}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      addedItems.has(item.id)
                        ? "bg-green-500 text-white scale-95"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {addedItems.has(item.id) ? (
                      "Added ✓"
                    ) : (
                      <>
                        <Plus size={14} /> Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              No items found
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
