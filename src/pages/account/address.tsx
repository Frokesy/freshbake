import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import {
  ArrowLeft,
  CurLoc,
  DeleteIcon,
  MinAddressIcon,
} from "../../components/icons";
import { supabase } from "../../../utils/supabaseClient";
import Button from "../../components/defaults/Button";
import Spinner from "../../components/defaults/Spinner";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { UserDataProps } from "../home";

const Address = () => {
  const [newAddress, setNewAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserDataProps>();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("userId", user.id);
        if (!error) {
          data.map((data) => setUserData(data));
        } else {
          console.log(error);
        }
      }
    };
    getUser();
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };

  const handleSaveAddress = async () => {
    setLoading(true);
    if (!userData) return;

    const { error } = await supabase
      .from("users")
      .update({ defaultAddress: newAddress })
      .eq("userId", userData.userId);

    if (error) {
      console.log(error);
      toast.error("Failed to update address.", {
        position: "top-right",
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    } else {
      toast.success("Address updated successfully!", {
        position: "top-right",
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  return (
    <MainContainer active="Account">
      <ToastContainer />
      <div className="flex items-center px-4 pt-10 space-x-4">
        <div className="flex">
          <NavLink to="/account" className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Addresses</h2>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-[#e8e8e8] flex items-center px-4 py-3 space-x-3 text-[14px] rounded-md border border-[#ccc]">
          <MinAddressIcon />
          <input
            type="text"
            placeholder="Add new address"
            className="bg-inherit w-[100%] outline-none border-none"
            value={newAddress}
            onChange={handleAddressChange}
          />
          <Button
            filled
            className="ml-4 px-4"
            onClick={handleSaveAddress}
            content={loading ? <Spinner /> : "Save"}
          />
        </div>

        <div className="flex items-center mt-4 text-[14px] space-x-4 pb-4">
          <CurLoc />
          <p>Use your current location</p>
        </div>
        <hr />

        <div className="space-y-3 mt-6">
          <h2 className="text-[16px] font-semibold">Saved Addresses</h2>
          <div className="flex justify-between items-center">
            <p className="text-[14px]">{userData?.defaultAddress}</p>
            <div className="bg-[#fae0e2] p-2 rounded-full">
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Address;
