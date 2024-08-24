import {
  ArrowDown,
  CustomerCareIcon,
  LocationIcon,
  NotificationIcon,
} from "../icons";

const TopNav = () => {
  return (
    <div className="fixed top-0 w-[100%] z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="">
          <div className="flex items-center space-x-2">
            <LocationIcon />
            <p className="font-semibold">Delivery Address</p>
            <ArrowDown />
          </div>
          <p className="text-[14px] mt-1">7890 Maple Ridge Road, SK</p>
        </div>
        <div className="flex items-center space-x-3">
          <CustomerCareIcon />
          <NotificationIcon />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
