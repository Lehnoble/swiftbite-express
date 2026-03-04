import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { RestaurantPage } from "./pages/RestaurantPage";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { AboutPage } from "./pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "menu", Component: MenuPage },
      { path: "restaurant/:id", Component: RestaurantPage },
      { path: "cart", Component: CartPage },
      { path: "orders", Component: OrdersPage },
      { path: "about", Component: AboutPage },
    ],
  },
]);
