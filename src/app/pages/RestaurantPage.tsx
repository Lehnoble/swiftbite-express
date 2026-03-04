import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, Clock, MapPin, Phone, ChevronLeft, Plus, Heart, Share2, Bike } from "lucide-react";
import { useApp } from "../context/AppContext";

const RESTAURANTS_DATA: Record<string, {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  coverImage: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  categories: string[];
  menu: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    popular: boolean;
    category: string;
  }[];
}> = {
  "1": {
    id: "1",
    name: "Burger Barn",
    cuisine: "American, Burgers, Comfort Food",
    rating: 4.8,
    ratingCount: 2847,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "456 Burger Street, New York, NY 10002",
    phone: "+1 (212) 555-0101",
    hours: "Mon–Sun: 10am – 11pm",
    description: "The best burgers in New York! We use 100% fresh beef, never frozen, and only the finest ingredients for every bite.",
    categories: ["Burgers", "Sides", "Drinks", "Desserts"],
    menu: [
      { id: "b1", name: "Classic Cheeseburger", description: "Double patty with cheddar, lettuce, tomato, and special sauce.", price: 12.99, image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Burgers" },
      { id: "b2", name: "BBQ Bacon Burger", description: "Smoky BBQ sauce, crispy bacon, and caramelized onions.", price: 14.99, image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Burgers" },
      { id: "b3", name: "Mushroom Swiss Burger", description: "Sautéed mushrooms, Swiss cheese, and herb mayo.", price: 13.99, image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Burgers" },
      { id: "s1", name: "Crispy Fries", description: "Golden, crispy fries seasoned to perfection.", price: 4.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Sides" },
      { id: "s2", name: "Onion Rings", description: "Thick-cut, crispy battered onion rings.", price: 5.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Sides" },
      { id: "d1", name: "Chocolate Milkshake", description: "Rich, creamy chocolate milkshake topped with whipped cream.", price: 7.99, image: "https://images.unsplash.com/photo-1655210909363-c2143432bccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Drinks" },
      { id: "de1", name: "Brownie Sundae", description: "Warm brownie topped with vanilla ice cream and hot fudge.", price: 8.99, image: "https://images.unsplash.com/photo-1655210909363-c2143432bccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Desserts" },
    ],
  },
  "2": {
    id: "2",
    name: "Pizza Palace",
    cuisine: "Italian, Pizza, Pasta",
    rating: 4.6,
    ratingCount: 1932,
    deliveryTime: "25-35 min",
    deliveryFee: 0,
    minOrder: 15,
    image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "789 Italia Ave, New York, NY 10003",
    phone: "+1 (212) 555-0202",
    hours: "Mon–Sun: 11am – 12am",
    description: "Authentic Italian pizza and pasta made with imported ingredients and traditional recipes passed down for generations.",
    categories: ["Pizza", "Pasta", "Starters", "Drinks"],
    menu: [
      { id: "p1", name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella, and basil.", price: 15.99, image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Pizza" },
      { id: "p2", name: "Pepperoni Pizza", description: "Generous pepperoni with mozzarella and tomato sauce.", price: 17.99, image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Pizza" },
      { id: "p3", name: "Four Cheese Pizza", description: "Mozzarella, gorgonzola, parmesan, and ricotta.", price: 19.99, image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Pizza" },
      { id: "pa1", name: "Spaghetti Carbonara", description: "Traditional carbonara with pancetta, egg, and pecorino.", price: 16.99, image: "https://images.unsplash.com/photo-1714611446679-6059b55d824e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Pasta" },
      { id: "pa2", name: "Penne Arrabbiata", description: "Spicy tomato sauce with garlic and chili flakes.", price: 14.99, image: "https://images.unsplash.com/photo-1714611446679-6059b55d824e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Pasta" },
    ],
  },
  "3": {
    id: "3",
    name: "Sushi Sakura",
    cuisine: "Japanese, Sushi, Asian",
    rating: 4.9,
    ratingCount: 3201,
    deliveryTime: "30-45 min",
    deliveryFee: 2.49,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "321 Sakura Blvd, New York, NY 10004",
    phone: "+1 (212) 555-0303",
    hours: "Tue–Sun: 12pm – 10pm",
    description: "Premium Japanese sushi crafted by experienced chefs using only the freshest fish flown in daily from Japan.",
    categories: ["Nigiri", "Rolls", "Appetizers", "Drinks"],
    menu: [
      { id: "s1", name: "Salmon Nigiri Set", description: "6 pieces of fresh salmon nigiri with wasabi and ginger.", price: 22.99, image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Nigiri" },
      { id: "s2", name: "Dragon Roll", description: "Shrimp tempura, avocado, cucumber topped with avocado.", price: 18.99, image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Rolls" },
      { id: "s3", name: "Rainbow Roll", description: "California roll topped with assorted sashimi.", price: 21.99, image: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Rolls" },
      { id: "s4", name: "Edamame", description: "Steamed edamame with sea salt.", price: 5.99, image: "https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Appetizers" },
    ],
  },
  "4": {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos, Burritos",
    rating: 4.5,
    ratingCount: 1456,
    deliveryTime: "15-25 min",
    deliveryFee: 0.99,
    minOrder: 12,
    image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "567 Fiesta Road, New York, NY 10005",
    phone: "+1 (212) 555-0404",
    hours: "Mon–Sun: 9am – 11pm",
    description: "Authentic Mexican street food made with fresh ingredients and traditional recipes from Mexico City.",
    categories: ["Tacos", "Burritos", "Sides", "Drinks"],
    menu: [
      { id: "t1", name: "Street Tacos (3pc)", description: "Corn tortillas with seasoned meat, onion, and cilantro.", price: 10.99, image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Tacos" },
      { id: "t2", name: "Beef Burrito", description: "Loaded beef burrito with rice, beans, cheese, and salsa.", price: 12.99, image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Burritos" },
      { id: "t3", name: "Loaded Nachos", description: "Tortilla chips with cheese, jalapeños, guacamole, and sour cream.", price: 9.99, image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Sides" },
    ],
  },
  "5": {
    id: "5",
    name: "Crispy Cluck",
    cuisine: "American, Fried Chicken",
    rating: 4.7,
    ratingCount: 2103,
    deliveryTime: "20-30 min",
    deliveryFee: 1.49,
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "234 Cluck Lane, New York, NY 10006",
    phone: "+1 (212) 555-0505",
    hours: "Mon–Sun: 10am – 10pm",
    description: "Hand-breaded, perfectly seasoned fried chicken made fresh to order. Never frozen, always crispy.",
    categories: ["Chicken", "Sandwiches", "Sides", "Drinks"],
    menu: [
      { id: "c1", name: "Crispy Fried Chicken", description: "Perfectly seasoned and fried to golden perfection.", price: 13.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Chicken" },
      { id: "c2", name: "Chicken Sandwich", description: "Crispy chicken breast on a brioche bun with pickles and mayo.", price: 11.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Sandwiches" },
      { id: "c3", name: "Chicken Wings (8pc)", description: "Crispy wings with your choice of sauce.", price: 14.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Chicken" },
      { id: "c4", name: "Mac & Cheese", description: "Creamy, rich mac and cheese made from scratch.", price: 6.99, image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Sides" },
    ],
  },
  "6": {
    id: "6",
    name: "Spice Garden",
    cuisine: "Indian, Curry, Tandoor",
    rating: 4.6,
    ratingCount: 1789,
    deliveryTime: "35-50 min",
    deliveryFee: 1.99,
    minOrder: 18,
    image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    address: "890 Spice Street, New York, NY 10007",
    phone: "+1 (212) 555-0606",
    hours: "Mon–Sun: 11am – 11pm",
    description: "Traditional Indian cuisine with rich, aromatic curries and tandoor specialties made with authentic spices.",
    categories: ["Curries", "Tandoor", "Breads", "Drinks"],
    menu: [
      { id: "i1", name: "Butter Chicken", description: "Tender chicken in a rich tomato-butter-cream sauce.", price: 15.99, image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Curries" },
      { id: "i2", name: "Lamb Rogan Josh", description: "Slow-cooked lamb with fragrant Kashmiri spices.", price: 18.99, image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Curries" },
      { id: "i3", name: "Tandoori Chicken", description: "Marinated in yogurt and spices, cooked in a traditional tandoor.", price: 16.99, image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: false, category: "Tandoor" },
      { id: "i4", name: "Garlic Naan", description: "Soft, pillowy naan brushed with garlic butter.", price: 3.99, image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", popular: true, category: "Breads" },
    ],
  },
};

export function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const { darkMode, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState(false);

  const restaurant = id ? RESTAURANTS_DATA[id] : null;

  const handleAdd = (item: { id: string; name: string; price: number; image: string }) => {
    if (!restaurant) return;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      restaurant: restaurant.name,
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

  if (!restaurant) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold mb-3">Restaurant not found</h2>
          <Link to="/menu" className="text-red-600 hover:underline">Browse our menu</Link>
        </div>
      </div>
    );
  }

  const menuItems =
    activeCategory === "All"
      ? restaurant.menu
      : restaurant.menu.filter((item) => item.category === activeCategory);

  const card = darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-100 shadow-sm";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50"}`}>
      {/* Cover Image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Link
          to="/menu"
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-xl text-sm font-medium hover:bg-white transition-colors"
        >
          <ChevronLeft size={16} /> Back
        </Link>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:bg-white"}`}
          >
            <Heart size={18} fill={liked ? "white" : "none"} />
          </button>
          <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Restaurant Info Card */}
        <div className={`rounded-2xl p-6 mb-6 ${card}`}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className={`text-2xl font-black mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {restaurant.name}
              </h1>
              <p className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {restaurant.cuisine}
              </p>
              <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {restaurant.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {restaurant.rating}
                  </span>
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-400"}`}>
                    ({restaurant.ratingCount.toLocaleString()} reviews)
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <Clock size={15} />
                  {restaurant.deliveryTime}
                </div>
                <div className={`flex items-center gap-1.5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <Bike size={15} />
                  {restaurant.deliveryFee === 0 ? "Free delivery" : `$${restaurant.deliveryFee} delivery`}
                </div>
              </div>
            </div>

            <div className={`text-sm space-y-2 sm:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin size={14} className="text-red-500" />
                <span className="text-xs">{restaurant.address}</span>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Phone size={14} className="text-red-500" />
                <span className="text-xs">{restaurant.phone}</span>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Clock size={14} className="text-red-500" />
                <span className="text-xs">{restaurant.hours}</span>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full inline-block mt-1 ${darkMode ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-700"}`}>
                Open Now
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setActiveCategory("All")}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === "All"
                ? "bg-red-600 text-white"
                : darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All
          </button>
          {restaurant.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
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

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md ${card}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-bold text-sm leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {item.name}
                    {item.popular && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-semibold">
                        🔥 Popular
                      </span>
                    )}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-black">${item.price}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      addedItems.has(item.id)
                        ? "bg-green-500 text-white scale-95"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {addedItems.has(item.id) ? "Added ✓" : <><Plus size={14} /> Add</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
