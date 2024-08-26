import { AnimatePresence } from "framer-motion";
import Onboarding from "./pages/onboarding";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ResetPassword from "./pages/reset-password";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Onboarding /> },
    { path: "/home", element: <Home /> },
    { path: "/reset-password", element: <ResetPassword /> }
  ])

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
