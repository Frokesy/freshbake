import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { ArrowLeft, Pen } from "../../components/icons";
import { useEffect, useState } from "react";
import { UserDataProps } from "../home";
import { supabase } from "../../../utils/supabaseClient";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Button from "../../components/defaults/Button";
import Spinner from "../../components/defaults/Spinner";

const ProfileDetails = () => {
  const [edit, setEdit] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps>();
  const [inputValues, setInputValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
const [loading, setLoading] = useState<boolean>(false)
const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("userId", user.id)
      .single();
    if (!error) {
      setUserData(data);
      setInputValues({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } else {
      console.log(error);
    }
  }
};
  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (field: keyof UserDataProps, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("users")
        .update(inputValues)
        .eq("userId", user.id);
      if (error) {
        console.log(error);
      } else {
        setEdit("")
        setLoading(false)
        getUser()
        toast.success(`Profile Updated!!`, {
          position: "top-right",
          theme: "light",
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
      }
    }
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
        <h2 className="font-semibold text-[24px]">Profile Details</h2>
      </div>

      <div className="mt-8 space-y-3">
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">First name</h2>
            {edit === "firstname" ? (
              <div className="">
                <input
                  type="text"
                  value={inputValues.firstname}
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                />
              </div>
            ) : (
              <p className="text-[14px] text-[#7A7474]">
                {userData?.firstname}
              </p>
            )}
          </div>
          <div className="" onClick={() => setEdit("firstname")}>
            {edit !== "firstname" && <Pen />}
          </div>
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Last name</h2>
            {edit === "lastname" ? (
              <div className="">
                <input
                  type="text"
                  value={inputValues.lastname}
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                />
              </div>
            ) : (
              <p className="text-[14px] text-[#7A7474]">{userData?.lastname}</p>
            )}
          </div>
          <div className="" onClick={() => setEdit("lastname")}>
            {edit !== "lastname" && <Pen />}
          </div>
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Email Address</h2>
            {edit === "email" ? (
              <div className="">
                <input
                  type="text"
                  value={inputValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            ) : (
              <p className="text-[14px] text-[#7A7474]">{userData?.email}</p>
            )}
          </div>
          <div className="" onClick={() => setEdit("email")}>
            {edit !== "email" && <Pen />}
          </div>
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Phone number</h2>
            {edit === "phone" ? (
              <div className="">
                <input
                  type="text"
                  value={inputValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            ) : (
              <p className="text-[14px] text-[#7A7474]">{userData?.phone}</p>
            )}
          </div>
          <div className="" onClick={() => setEdit("phone")}>
            {edit !== "phone" && <Pen />}
          </div>
        </div>
      </div>

      {edit && (
        <Button filled className="mx-4 mt-10" onClick={handleSave} content={loading ? <Spinner /> : "Save Changes"} />
      )}
    </MainContainer>
  );
};

export default ProfileDetails;
