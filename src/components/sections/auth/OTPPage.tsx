import { useState } from "react";
import OTPInput from "./OTPInput";
import Button from "../../defaults/Button";

const OTPPage = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  console.log(otp);
  return (
    <div className="">
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
      </div>
      <div className="fixed px-4 bottom-6 w-[100%] space-y-6">
        <Button filled={true} content="Verify OTP" className="text-[18px]" />
        <Button filled={false} content="Resend OTP" className="text-[18px]" />
      </div>
    </div>
  );
};

export default OTPPage;
