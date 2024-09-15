import { UserDataProps } from "../../pages/home";
import {
  ArrowDown,
  CustomerCareIcon,
  LocationIcon,
  NotificationIcon,
} from "../icons";
import { FC } from "react";
import TextSkeleton from "../skeletons/TextSkeleton";
import { NavLink } from "react-router-dom";

interface TopNavProps {
  data: UserDataProps | undefined;
}

const TopNav: FC<TopNavProps> = ({ data }) => {
  return (
    <div className="fixed top-0 w-[100%] bg-[#fff] lg:w-[450px] z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="">
          <div className="flex items-center space-x-2">
            <LocationIcon />
            <p className="font-semibold">Delivery Address</p>
            <ArrowDown />
          </div>
          {!data?.defaultAddress ? (
            <TextSkeleton />
          ) : (
            <p className="text-[13px] mt-1">{data?.defaultAddress}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <CustomerCareIcon />
          <NavLink to="/notifications">
            <NotificationIcon />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
