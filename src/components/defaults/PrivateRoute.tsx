import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { supabase } from "../../../utils/supabaseClient";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner color="#000" />
      </div>
    );
  }

  return authenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
