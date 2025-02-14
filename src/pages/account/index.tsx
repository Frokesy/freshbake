import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import {
  AccountProfile,
  AddressIcon,
  CaretRight,
  CustomerCareIcon,
  LogoutIcon,
} from "../../components/icons";
import { UserDataProps } from "../home";
import { useEffect, useState } from "react";
import LogoutModal from "../../components/modals/LogoutModal";
import TextSkeleton from "../../components/skeletons/TextSkeleton";
import { pb } from "../../../utils/pocketbaseClient";

const Account = () => {
  const accountItems = [
    {
      id: 1,
      name: "Profile Details",
      icon: <AccountProfile />,
      route: "profile-details",
    },
    { id: 2, name: "Address", icon: <AddressIcon />, route: "address" },
    {
      id: 3,
      name: "Customer Service",
      icon: <CustomerCareIcon />,
      route: "/customer-service"
    },
    { id: 4, name: "Logout", icon: <LogoutIcon /> },
  ];
  const [userData, setUserData] = useState<UserDataProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
  const getUser = async () => {
    try {
      const user = pb.authStore.model;

      if (user) {
        const data = await pb.collection("users").getFirstListItem(`id="${user.id}"`);
        
        if (data) {
          setUserData(data as unknown as UserDataProps);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  getUser();
}, []);
  return (
    <MainContainer active="Account">
      <div className="bg-[#ffbb1d] min-h-screen pt-[15vh]">
        {userData?.firstname ? (
          <h2 className="px-4 text-[24px] font-semibold">
            Hello {userData?.firstname},
          </h2>
        ) : (
          <div className="px-4 w-[70%]"><TextSkeleton /></div>
        )}

        <div className="min-h-[80vh] mt-4 bg-[#fff] rounded-t-[40px] pt-6">
          <h2 className="font-semibold text-[20px] px-4">Account</h2>

          <div className="mt-3">
            {accountItems.map((item) => (
              <NavLink
                to={item.route as string}
                onClick={() => item.name === "Logout" && setIsOpen(true)}
                className="flex justify-between text-[14px] py-5 px-4 hover:bg-[#f1f1f1] transition-all duration-300 ease-in-out border-b-2 border-[#f1f1f1]"
                key={item.id}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <h2>{item.name}</h2>
                </div>
                {item.name !== "Logout" && <CaretRight />}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {isOpen && <LogoutModal setIsOpen={setIsOpen} />}
    </MainContainer>
  );
};

export default Account;
