import { ToastContainer, toast } from "react-toastify";
import Input from "../../defaults/Input";
import { FC, useState } from "react";
import Button from "../../defaults/Button";
import Spinner from "../../defaults/Spinner";
import { OTPProps } from "./OTPPage";
import { supabase } from "../../../../utils/supabaseClient"; // import Supabase client
import { useNavigate } from "react-router-dom";

const NewPassword: FC<OTPProps> = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);


    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError("Failed to reset password. Please try again.");
        console.error("Error resetting password:", error);
      } else {
        toast.success("Password reset successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
            navigate("/")
        }, 2000)
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="px-4 pt-10">
        <div className="h-2 w-[100%] flex space-x-3">
          <div className="w-[50%] bg-[#F4E8B7] h-[100%] rounded-md"></div>
          <div className="w-[50%] bg-[#7d6c3a] h-[100%] rounded-md"></div>
        </div>
        <h2 className="text-[24px] font-semibold mt-6">Reset your Password</h2>
        <p className="text-[15px] mt-2">Enter new password</p>

        <div className="mt-4 space-y-6">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        {error && <p className="mt-2 text-[#ff0000] text-[13px]">{error}</p>}
      </div>
      <div className="fixed px-4 bottom-6 lg:w-[450px] w-[100%] space-y-6">
        <Button
          filled={true}
          onClick={handleSubmit}
          content={loading ? <Spinner /> : "Reset Password"}
          disabled={loading}
          className="text-[18px]"
        />
      </div>
    </div>
  );
};

export default NewPassword;
