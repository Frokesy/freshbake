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
  setUser,
}) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const plunkClient = new Plunk(
    "sk_be82d7ea662e6422f5b77d4f9f17153cdf7e2aedd142e35e"
  );

  const sendEmail = async (firstname: string | undefined, otp: string) => {
    try {
      const emailHtml = render(
        <ForgotPasswordTemplate firstname={firstname} otp={otp} />
      );

      await plunkClient.emails.send({
        to: email as string,
        subject: "Password Reset",
        body: await emailHtml,
      });

      if (userData) {
        setUser(userData);
        toast.success("Please check your email for the OTP", {
          position: "top-right",
          theme: "light",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        setTimeout(() => setActiveScreen("otp"), 1500);
      }
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 10 * 60000);

      const { error } = await supabase.from("otp_requests").insert([
        {
          user_id: userData?.userId,
          otp,
          expires_at: expiresAt.toISOString(),
        },
      ]);

      if (error) {
        setLoading(false);
        console.error("Error saving OTP:", error);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to send email:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    setError(null);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

      
      if (!error) {
        data.map((data) => setUserData(data));
    } else {
      console.log(error);
    }
    
  };

  useEffect(() => {
    if (userData) {
      sendEmail(userData?.firstname, otp);
    }
  }, [userData])

  useEffect(() => {
    const generateOTP = (length = 6) => {
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      setOtp(otp);
      return otp;
    };

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
        <p className="text-[15px] mt-2">Enter your email</p>

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
