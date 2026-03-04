import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "b1",
      name: "Classic Cheeseburger",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1676300187485-8bd01a71d755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      restaurant: "Burger Barn",
    },
    {
      id: "p1",
      name: "Margherita Pizza",
      price: 15.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1724232822245-f430d53466e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      restaurant: "Pizza Palace",
    },
  ]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
