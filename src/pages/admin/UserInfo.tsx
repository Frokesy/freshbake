import { NavLink } from "react-router-dom";
import AdminContainer from "../../components/containers/AdminContainer";
import { ArrowLeft } from "../../components/icons";

const UserInfo = () => {
  return (
    <AdminContainer active="Account">
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <NavLink
            to="/admin/dashboard"
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Users Information</h2>
      </div>

      <div className="mt-6 text-[14px] space-y-3">
        <div className="flex justify-between items-center border border-[#ccc] p-4">
          <div className="">
            <h2>Jackson Adeolu</h2>
            <p>jacksonadeolu21@gmail.com</p>
          </div>
          <p>+432-657-3953</p>
        </div>
        <div className="flex justify-between items-center border border-[#ccc] p-4">
          <div className="">
            <h2>Jackson Adeolu</h2>
            <p>jacksonadeolu21@gmail.com</p>
          </div>
          <p>+432-657-3953</p>
        </div>
        <div className="flex justify-between items-center border border-[#ccc] p-4">
          <div className="">
            <h2>Jackson Adeolu</h2>
            <p>jacksonadeolu21@gmail.com</p>
          </div>
          <p>+432-657-3953</p>
        </div>
      </div>
    </AdminContainer>
  );
};

export default UserInfo;
