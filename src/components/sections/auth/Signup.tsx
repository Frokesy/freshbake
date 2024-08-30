import { FC, useState } from "react";
import Input from "../../defaults/Input";
import { LoginProps } from "./Login";
import Button from "../../defaults/Button";
import { handleSignup } from "../../../../utils/signupService";

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

  const handleAuth = async () => {
    await handleSignup(validateField, user, validatePassword, setError);
  };
  return (
    <div className="px-4 pt-10">
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
          <Button onClick={handleAuth} filled content="Signup" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
