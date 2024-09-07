import { FC, useState } from "react";
import Button from "../../defaults/Button";
import Input from "../../defaults/Input";
import { handleLogin } from "../../../../utils/loginService";
import { useNavigate } from "react-router-dom";
import Spinner from "../../defaults/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface LoginProps {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
}

const Login: FC<LoginProps> = ({ setActiveScreen }) => {
  const [user, setUser] = useState({
    input: "",
    password: "",
  });
  const [error, setError] = useState({
    input: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateField = (value: string) => {
    if (value === "") {
      return false;
    } else {
      return true;
    }
  };

  const validateLogin = async () => {
    await handleLogin(
      validateField,
      user,
      setError,
      setLoading,
      navigate,
      keepLoggedIn
    );
  };
  return (
    <div className="px-4 pt-10">
      <ToastContainer />
      <h2 className="text-[24px] font-semibold">Login</h2>
      <p className="text-[15px]">
        Don&apos;t have an account?{" "}
        <span
          className="font-semibold text-[#ccb555]"
          onClick={() => setActiveScreen("signup")}
        >
          Register
        </span>
      </p>

      <div className="space-y-6 mt-8">
        <Input
          label="Email"
          type="text"
          value={user.input}
          onChange={(e) => setUser({ ...user, input: e.target.value })}
          loginInputErr={error.input}
        />
        <Input
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          pwdErr={error.password}
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 text-[15px] font-semibold">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              name="isLoggedIn"
              id="isLoggedIn"
            />
            <label htmlFor="isLoggedIn">Keep me logged in</label>
          </div>

          <p className="text-[#ccb555] text-[15px]">Forgot Password?</p>
        </div>

        <div className="pt-10">
          <Button
            onClick={validateLogin}
            filled
            content={loading ? <Spinner /> : "Login"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
