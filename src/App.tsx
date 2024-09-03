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
import Order from "./pages/orders/Order";
import PrivateRoute from "./components/defaults/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Onboarding /> },
    {
      path: "/home",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      ),
    },
    {
      path: "/checkout",
      element: (
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      ),
    },
    {
      path: "/account",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/profile-details",
      element: (
        <PrivateRoute>
          <ProfileDetails />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/address",
      element: (
        <PrivateRoute>
          <Address />
        </PrivateRoute>
      ),
    },
    {
      path: "/success",
      element: (
        <PrivateRoute>
          <Success />
        </PrivateRoute>
      ),
    },
    {
      path: "/orders/track-order/:transactionId",
      element: (
        <PrivateRoute>
          <Order />
        </PrivateRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <PrivateRoute>
          <ResetPassword />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
