import { AnimatePresence } from "framer-motion";
import Onboarding from "./pages/onboarding";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ResetPassword from "./pages/reset-password";
import Cart from "./pages/cart";
import Checkout from "./pages/cart/checkout";
import Orders from "./pages/orders";
import Account from "./pages/account";
import ProfileDetails from "./pages/account/profile-details";
import Address from "./pages/account/address";
import Success from "./pages/res/Success";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Onboarding /> },
    { path: "/home", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/orders", element: <Orders /> },
    { path: "/account", element: <Account /> },
    { path: "/account/profile-details", element: <ProfileDetails /> },
    { path: "/account/address", element: <Address /> },
    { path: "/success", element: <Success /> },
    { path: "/reset-password", element: <ResetPassword /> }
  ])

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
