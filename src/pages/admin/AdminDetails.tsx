import { NavLink } from "react-router-dom";
import AdminContainer from "../../components/containers/AdminContainer";
import { ArrowLeft, Pen } from "../../components/icons";

const AdminDetails = () => {
  return (
    <AdminContainer active="Account">
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <NavLink
            to="/admin/admin-profile"
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Admin Details</h2>
      </div>

      <div className="mt-6 space-y-3 text-[14px]">
        <div className="flex justify-between items-center border border-[#e8e8e8] p-4">
          <div className="">
            <h2 className="text-[12px]">Vendor name</h2>
            <p className="text-[#7a7474]">Ayo Ilaro</p>
          </div>
          <div className=""><Pen /></div>
        </div>

        <div className="flex justify-between items-center border border-[#e8e8e8] p-4">
          <div className="">
            <h2 className="text-[12px]">Pickup address</h2>
            <p className="text-[#7a7474]">4088 Kinsella Way SW Edmonton</p>
          </div>
          <div className=""><Pen /></div>
        </div>

        <div className="flex justify-between items-center border border-[#e8e8e8] p-4">
          <div className="">
            <h2 className="text-[12px]">Phone number</h2>
            <p className="text-[#7a7474]">+639-382-5684</p>
          </div>
          <div className=""><Pen /></div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminDetails;
