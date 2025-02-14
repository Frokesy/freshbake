import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { ArrowLeft, Pen } from "../../components/icons";
import { useEffect, useState } from "react";
import { UserDataProps } from "../home";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Button from "../../components/defaults/Button";
import Spinner from "../../components/defaults/Spinner";
import { motion } from "framer-motion";
import { pb } from "../../../utils/pocketbaseClient";

const ProfileDetails = () => {
  const [edit, setEdit] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps>();
  const [inputValues, setInputValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const getUser = async () => {
    try {
      const user = pb.authStore.model;
      if (!user) return;
  
      const data = await pb.collection("users").getOne(user.id);
  
      setUserData(data as unknown as UserDataProps);
      setInputValues({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
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
    try {
      setLoading(true);
  
      const user = pb.authStore.model;
      if (!user) return;
  
      await pb.collection("users").update(user.id, inputValues);
  
      setEdit("");
      setLoading(false);
      getUser();
  
      toast.success("Profile Updated!!", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
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
        <motion.div
          key="firstname"
          className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[100%]">
            <h2 className="text-[12px]">First name</h2>
            {edit === "firstname" ? (
              <div className="w-[100%]">
                <input
                  type="text"
                  className="w-[100%] outline-none"
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
        </motion.div>

        <motion.div
          key="lastname"
          className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[100%]">
            <h2 className="text-[12px]">Last name</h2>
            {edit === "lastname" ? (
              <div className="w-[100%]">
                <input
                  type="text"
                  className="w-[100%] outline-none"
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
        </motion.div>

        <motion.div
          key="email"
          className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[100%]">
            <h2 className="text-[12px]">Email Address</h2>
            {edit === "email" ? (
              <div className="w-[100%]">
                <input
                  type="text"
                  className="w-[100%] outline-none"
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
        </motion.div>

        <motion.div
          key="phone"
          className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[100%]">
            <h2 className="text-[12px]">Phone number</h2>
            {edit === "phone" ? (
              <div className="w-[100%]">
                <input
                  type="text"
                  className="w-[100%] outline-none"
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
        </motion.div>
      </div>

      {edit && (
        <motion.div
          key="save-button"
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            filled
            className="mx-4 mt-10"
            onClick={handleSave}
            content={loading ? <Spinner /> : "Save Changes"}
          />
        </motion.div>
      )}
    </MainContainer>
  );
};

export default ProfileDetails;
