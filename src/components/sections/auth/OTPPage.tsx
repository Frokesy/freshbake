import { FC, useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import Button from "../../defaults/Button";
import { supabase } from "../../../../utils/supabaseClient";
import { UserDataProps } from "../../../pages/home";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../defaults/Spinner";
import { ForgotPasswordTemplate } from "../../email-templates/ForgotPassword";
import { render } from "@react-email/render";
import Plunk from "@plunk/node";

export interface OTPProps {
  user?: UserDataProps | undefined;
}

const OTPPage: FC<OTPProps> = ({ user }) => {
  const [otp, setOtp] = useState<string>("");
  const [reotp, setReOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };
  const webUrl = import.meta.env.VITE_WEB_URL;
  const plunkClient = new Plunk(
    "sk_be82d7ea662e6422f5b77d4f9f17153cdf7e2aedd142e35e"
  );

  const validateOTP = async (enteredOtp: string) => {
    try {
      const { data, error } = await supabase
        .from("otp_requests")
        .select("*")
        .eq("otp", enteredOtp)
        .single();

      if (error || !data) {
        setError("Invalid OTP");
        return { valid: false, message: "Invalid OTP" };
      }

      const now = new Date();
      const expiresAt = new Date(data.expires_at);

      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const localExpiresAt = new Date(expiresAt.getTime() - timezoneOffset);

      if (localExpiresAt < now) {
        setError("OTP expired");
        return { valid: false, message: "OTP expired" };
      }

      setError("");
      return { valid: true, message: "OTP is valid" };
    } catch (err) {
      console.error("Error validating OTP:", err);
      setError("An error occurred while validating the OTP");
      return { valid: false, message: "Error occurred" };
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const { valid, message } = await validateOTP(otp);
    setLoading(false);

    if (valid) {
      toast.success(
        "OTP Verified! Please check your email for a link to reset your password.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email as string, {
        redirectTo: `${webUrl}/new-password`,
      });

      if (error) {
        console.log(error)
      }
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const sendEmail = async (firstname: string | undefined, otp: string) => {
    try {
      const emailHtml = render(
        <ForgotPasswordTemplate firstname={firstname} otp={otp} />
      );

      await plunkClient.emails.send({
        to: user?.email as string,
        subject: "Password Reset",
        body: await emailHtml,
      });
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 10 * 60000);

      const { error } = await supabase.from("otp_requests").insert([
        {
          user_id: user?.userId,
          otp: reotp,
          expires_at: expiresAt.toISOString(),
        },
      ]);

      if (error) {
        setLoading(false);
        console.error("Error saving OTP:", error);
      } else {
        console.log("sent")
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to send email:", error);
    }
  };
  const handleResendOTP = async () => {

    sendEmail(user?.firstname, reotp)
    toast.info("Resending OTP...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const regenerateOTP = (length = 6) => {
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      setReOtp(otp);
      return otp;
    };

    regenerateOTP();
  }, []);

  return (
    <div className="">
        <div>
          <ToastContainer />
          <div className="px-4 pt-10">
            <div className="h-2 w-[100%] flex space-x-3">
              <div className="w-[50%] bg-[#F4E8B7] h-[100%] rounded-md"></div>
              <div className="w-[50%] bg-[#7d6c3a] h-[100%] rounded-md"></div>
            </div>
            <h2 className="text-[24px] font-semibold mt-6">Enter OTP</h2>
            <p className="text-[15px] mt-2">Enter the OTP sent to your email</p>

            <div className="mt-4 flex justify-center">
              <OTPInput length={6} onChange={handleOtpChange} />
            </div>

            {error && (
              <p className="mt-2 text-[#ff0000] text-[13px]">{error}</p>
            )}
          </div>

          <div className="fixed px-4 bottom-6 w-[100%] space-y-6">
            <Button
              filled={true}
              onClick={handleVerifyOTP}
              content={loading ? <Spinner /> : "Verify OTP"}
              disabled={loading}
              className="text-[18px]"
            />
            <Button
              filled={false}
              onClick={handleResendOTP}
              content="Resend OTP"
              className="text-[18px]"
            />
          </div>
        </div>
    </div>
  );
};

export default OTPPage;
