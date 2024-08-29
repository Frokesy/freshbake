import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import {
  ArrowLeft,
  CurLoc,
  DeleteIcon,
  MinAddressIcon,
} from "../../components/icons";

const Address = () => {
  return (
    <MainContainer active="Account">
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
          />
        </div>

        <div className="flex items-center mt-4 text-[14px] space-x-4 pb-4">
          <CurLoc />
          <p>Use your current location</p>
        </div>
        <hr />

        <div className="space-y-3 mt-6">
          <h2 className="text-[16px] font-semibold">Saved Addresses</h2>
          <div className="flex justify-between items-center">
            <p className="text-[14px]">7890 Maple Ridge Road, SK</p>
            <div className="bg-[#fae0e2] p-2 rounded-full">
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Address;
