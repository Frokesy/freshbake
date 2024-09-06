import { NavLink } from "react-router-dom";
import AdminContainer from "../../components/containers/AdminContainer";
import { ArrowLeft } from "../../components/icons";
import { useState } from "react";
import NewOrders from "../../components/admin/orders/NewOrders";

const AllOrders = () => {
  const [activeTab, setActiveTab] = useState<string>("newOrders");
  return (
    <AdminContainer active="All Orders">
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <NavLink
            to="/admin/dashboard"
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">My Orders</h2>
      </div>
      <div className="mt-4 mb-2 mx-4 bg-[#d9d9d9] p-1.5 items-center rounded-lg text-[14px] flex">
        <p
          onClick={() => setActiveTab("newOrders")}
          className={`${
            activeTab === "newOrders"
              ? "bg-[#7d6c3a] text-[#fff]"
              : "text-[#808080]"
          } w-[50%] flex justify-center transition-all duration-500 ease-in-out py-2 rounded-lg`}
        >
          New Orders
        </p>
        <p
          onClick={() => setActiveTab("completeOrders")}
          className={`${
            activeTab === "completeOrders"
              ? "bg-[#7d6c3a] text-[#fff]"
              : "text-[#808080]"
          } w-[50%] flex justify-center transition-all duration-500 ease-in-out py-2 rounded-lg`}
        >
          Complete Orders
        </p>
      </div>

        <NewOrders />
    </AdminContainer>
  );
};

export default AllOrders;
