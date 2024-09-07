import { NavLink } from "react-router-dom";
import AdminContainer from "../../components/containers/AdminContainer";
import {
  AccountIcon,
  CaretRight,
  CustomerCareIcon,
} from "../../components/icons";
import { AdminDetailsIcon } from "../../components/admin/icons";

const AdminProfile = () => {
  const accountItems = [
    {
      id: 1,
      name: "Customer Support",
      icon: <CustomerCareIcon />,
    },
    {
      id: 2,
      name: "Users Information",
      icon: <AccountIcon />,
      route: "/admin/users-info"
    },
    {
      id: 3,
      name: "Admin Details",
      icon: <AdminDetailsIcon />,
      route: "/admin/admin-details"
    },
  ];
  return (
    <AdminContainer active="Account">
      <div className="bg-[#ffbb1d] min-h-screen pt-[15vh]">
        <h2 className="px-4 text-[24px] font-semibold">User Management</h2>

        <div className="min-h-[80vh] mt-4 bg-[#fff] rounded-t-[40px] pt-6">
          <h2 className="font-semibold text-[20px] px-4">Admin</h2>

          <div className="mt-3">
            {accountItems.map((item) => (
              <NavLink
                to={item.route as string}
                className="flex justify-between text-[14px] py-5 px-4 hover:bg-[#f1f1f1] transition-all duration-300 ease-in-out border-b-2 border-[#f1f1f1]"
                key={item.id}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <h2>{item.name}</h2>
                </div>
                <CaretRight />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminProfile;
