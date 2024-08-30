import { FC, useState } from "react";
import Input from "../../defaults/Input";
import { LoginProps } from "./Login";
import Button from "../../defaults/Button";
import { handleSignup } from "../../../../utils/signupService";
import Spinner from "../../defaults/Spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup: FC<LoginProps> = ({ setActiveScreen }) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateField = (value: string) => {
    if (value === "") {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,}$/;
    return passwordRegex.test(password);
  };

  const validateSignup = async () => {
    await handleSignup(
      validateField,
      user,
      validatePassword,
      setError,
      setLoading,
      navigate
    );
  };
  return (
    <div className="px-4 pt-10">
      <ToastContainer />
      <h2 className="text-[24px] font-semibold">Create Account</h2>
      <p className="text-[15px]">
        Already an existing user?{" "}
        <span
          className="font-semibold text-[#ccb555]"
          onClick={() => setActiveScreen("login")}
        >
          Login
        </span>
      </p>

      <div className="space-y-6 mt-8">
        <div className="flex justify-between">
          <div className="w-[47%]">
            <Input
              label="First name"
              type="text"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              fnErr={error.firstname}
            />
          </div>
          <div className="w-[47%]">
            <Input
              label="Last name"
              type="text"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              lnErr={error.lastname}
            />
          </div>
        </div>

        <Input
          type="email"
          label="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          emailErr={error.email}
        />

        <Input
          type="number"
          label="Phone number"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          phoneErr={error.phone}
        />
        <Input
          type="password"
          label="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          pwdErr={error.password}
        />
        <div className="pt-10">
          <Button
            onClick={validateSignup}
            filled
            disabled={loading}
            content={loading ? <Spinner /> : "Signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
