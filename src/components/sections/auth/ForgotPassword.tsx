import { FC, useEffect, useState } from "react";
import Button from "../../defaults/Button";
import Input from "../../defaults/Input";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { supabase } from "../../../../utils/supabaseClient";
import { UserDataProps } from "../../../pages/home";
import { render } from "@react-email/render";
import { ForgotPasswordTemplate } from "../../email-templates/ForgotPassword";
import Plunk from "@plunk/node";
import Spinner from "../../defaults/Spinner";

export interface PasswordResetPros {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>;
}

const ForgotPassword: FC<PasswordResetPros> = ({
  setActiveScreen,
  setUser

}) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const plunkClient = new Plunk(
    "sk_be82d7ea662e6422f5b77d4f9f17153cdf7e2aedd142e35e"
  );

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateOTP = (length = 6): string => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    setOtp(otp);
    return otp;
  };

  const sendEmail = async (firstname: string | undefined) => {
    try {
      const emailHtml = render(
        <ForgotPasswordTemplate firstname={firstname} otp={otp} />
      );

      await plunkClient.emails.send({
        to: email,
        subject: "Password Reset",
        body: await emailHtml,
      });

      toast.success("OTP sent! Please check your email.", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });

      setTimeout(() => setActiveScreen("otp"), 1500);

    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send OTP. Please try again.", {
        position: "top-right",
        theme: "light",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setInfoMessage(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setInfoMessage("Searching for your account...");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (error || !data.length) {
        setError("User not found. Please check your email address.");
        setLoading(false);
        return;
      }

      setUserData(data[0]);
      setUser(data[0])
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    if (userData) {
      sendEmail(userData.firstname);
      setInfoMessage("Sending OTP...");
    }
  }, [userData]);

  useEffect(() => {
    generateOTP();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="px-4 pt-10">
        <div className="h-2 w-[100%] flex space-x-3">
          <div className="w-[50%] bg-[#7d6c3a] h-[100%] rounded-md"></div>
          <div className="w-[50%] bg-[#F4E8B7] h-[100%] rounded-md"></div>
        </div>
        <h2 className="text-[24px] font-semibold mt-6">Forgot Password</h2>
        <p className="text-[15px] mt-2">Enter your email to receive an OTP</p>

        <div className="mt-4">
          <Input
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
          />
        </div>

        {error && <p className="mt-2 text-[#ff0000] text-[13px]">{error}</p>}
        {infoMessage && <p className="mt-2 text-[#007bff] text-[13px]">{infoMessage}</p>}
      </div>

      <div className="fixed px-4 bottom-6 lg:w-[450px] w-[100%] space-y-6">
        <Button
          filled={true}
          onClick={handleSubmit}
          content={loading ? <Spinner /> : "Continue"}
          disabled={loading}
          className="text-[18px]"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
