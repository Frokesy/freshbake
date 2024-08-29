import MainContainer from "../../components/containers/MainContainer";
import {
  AccountProfile,
  AddressIcon,
  CaretRight,
  CustomerCareIcon,
  LogoutIcon,
} from "../../components/icons";

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
      route: "/customer-service",
    },
    { id: 4, name: "Logout", icon: <LogoutIcon /> },
  ];
  return (
    <MainContainer active="Account">
      <div className="bg-[#ffbb1d] min-h-screen pt-[15vh]">
        <h2 className="px-4 text-[24px] font-semibold">Hello Adeolu,</h2>

        <div className="min-h-[80vh] mt-4 bg-[#fff] rounded-t-[40px] pt-6">
          <h2 className="font-semibold text-[20px] px-4">Account</h2>

          <div className="mt-3">
            {accountItems.map((item) => (
              <div
                className="flex justify-between text-[14px] py-5 px-4 hover:bg-[#f1f1f1] transition-all duration-300 ease-in-out border-b-2 border-[#f1f1f1]"
                key={item.id}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <h2>{item.name}</h2>
                </div>
                {item.name !== "Logout" && <CaretRight />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Account;
