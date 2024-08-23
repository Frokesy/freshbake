import { FC } from "react";
import Input from "../../defaults/Input";
import { LoginProps } from "./Login";
import Button from "../../defaults/Button";

const Signup: FC<LoginProps> = ({ setActiveScreen }) => {
  return (
    <div className="px-6 pt-10">
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
            <Input label="First name" type="text" />
          </div>
          <div className="w-[47%]">
            <Input label="Last name" type="text" />
          </div>
        </div>

        <Input type="email" label="Email address" />
        <Input type="number" label="Phone number" />
        <Input type="password" label="Password" />
        <div className="pt-10">
          <Button filled content="Signup" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
