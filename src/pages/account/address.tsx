import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { ArrowLeft, CurLoc, MinAddressIcon } from "../../components/icons";
import { supabase } from "../../../utils/supabaseClient";
import Button from "../../components/defaults/Button";
import Spinner from "../../components/defaults/Spinner";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { UserDataProps } from "../home";
import axios from "axios";

const Address = () => {
  const [newAddress, setNewAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [locLoading, setLocLoading] = useState<boolean>(false); // New state for location loading
  const [userData, setUserData] = useState<UserDataProps>();
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json`,
              {
                params: {
                  q: `${lat}+${lng}`,
                  key: "b5c5f08e58344deb940ca12b3ea1d20f",
                },
              }
            );

            const result = response.data.results[0];
            if (result) {
              const city = result.components.city || result.components.county;
              const state = result.components.state;
              const country = result.components.country;
              const loc = `${city}, ${state}, ${country}`;
              setLocation(loc);
              setNewAddress(loc);
              setError(null);
            } else {
              setLocation(null);
              setError("Location information not available.");
            }
          } catch (error) {
            setLocation(null);
            console.log(error)
            setError("Error fetching location details.");
          } finally {
            setLocLoading(false);
          }
        },
        (error) => {
          console.log(error);
          setError("Failed to retrieve location.");
          setLocLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    setTimeout(() => {
      setError(null);
    }, 2000);
  };

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

  useEffect(() => {
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
      getUser();
    }
    setLoading(false);
  };

  console.log(location)

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
            className="ml-4 px-6 h-[35px]"
            onClick={handleSaveAddress}
            content={loading ? <Spinner /> : "Save"}
          />
        </div>

        <div
          onClick={handleGetLocation}
          className="flex items-center mt-4 text-[14px] space-x-4 pb-4"
        >
          <CurLoc />
          <p>Use your current location</p>
          {locLoading && <Spinner color="#000" />}
        </div>
        {error && <p className="text-[14px] text-[#ff0000]">{error}</p>}
        <hr />

        <div className="space-y-3 mt-6">
          <h2 className="text-[16px] font-semibold">Current Address</h2>
          <div className="flex justify-between items-center">
            <p className="text-[14px]">{userData?.defaultAddress}</p>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Address;
