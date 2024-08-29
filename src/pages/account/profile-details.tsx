import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { ArrowLeft, Pen } from "../../components/icons";

const ProfileDetails = () => {
  return (
    <MainContainer active="Account">
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
            <h2 className="text-[12px]">Account name</h2>
            <p className="text-[14px] text-[#7A7474]">Jackson Adeolu</p>
          </div>
          <Pen />
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Email Address</h2>
            <p className="text-[14px] text-[#7A7474]">jacksonadeolu@gmail.com</p>
          </div>
          <Pen />
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Phone number</h2>
            <p className="text-[14px] text-[#7A7474]">+4321263628</p>
          </div>
          <Pen />
        </div>
        <div className="px-4 border border-[#E4E4E4] flex justify-between items-center py-3">
          <div className="">
            <h2 className="text-[12px]">Password</h2>
            <p className="text-[14px] text-[#7A7474]">**********</p>
          </div>
          <Pen />
        </div>
      </div>
    </MainContainer>
  );
};

export default ProfileDetails;
