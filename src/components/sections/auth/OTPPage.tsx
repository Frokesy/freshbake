import { FC, useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import Button from "../../defaults/Button";
import { UserDataProps } from "../../../pages/home";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../defaults/Spinner";
import { ForgotPasswordTemplate } from "../../email-templates/ForgotPassword";
import { render } from "@react-email/render";
import Plunk from "@plunk/node";
import { pb } from "../../../../utils/pocketbaseClient";

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
  // const webUrl = import.meta.env.VITE_WEB_URL;
  const plunkSecret = import.meta.env.VITE_PLUNK_SECRET;

  const plunkClient = new Plunk(plunkSecret);

  const validateOTP = async (enteredOtp: string) => {
    try {
      const record = await pb
        .collection("otp_requests")
        .getFirstListItem(`otp="${enteredOtp}"`);

      if (!record) {
        setError("Invalid OTP");
        return { valid: false, message: "Invalid OTP" };
      }

      const now = new Date();
      const expiresAt = new Date(record.expires_at);

      if (expiresAt < now) {
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

      try {
        await pb
          .collection("users")
          .requestPasswordReset(user?.email as string);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        toast.error("Failed to send reset email. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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

      const record = await pb.collection("otp_requests").create({
        userId: user?.id,
        otp,
        expires_at: expiresAt.toISOString(),
      });

      console.log("OTP sent and saved successfully", record);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to send email or save OTP:", error);
    }
  };

  const handleResendOTP = async () => {
    sendEmail(user?.firstname, reotp);
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

          {error && <p className="mt-2 text-[#ff0000] text-[13px]">{error}</p>}
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
