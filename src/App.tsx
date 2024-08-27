import { AnimatePresence } from "framer-motion";
import Onboarding from "./pages/onboarding";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ResetPassword from "./pages/reset-password";
import Cart from "./pages/cart";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Onboarding /> },
    { path: "/home", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/reset-password", element: <ResetPassword /> }
  ])

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
