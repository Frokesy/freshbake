import { UserDataProps } from "../../pages/home";
import {
  ArrowDown,
  CustomerCareIcon,
  LocationIcon,
  NotificationIcon,
} from "../icons";
import { FC, useEffect, useState } from "react";
import TextSkeleton from "../skeletons/TextSkeleton";
import { NavLink } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";

interface TopNavProps {
  data: UserDataProps | undefined;
}

interface NotificationProps {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const TopNav: FC<TopNavProps> = ({ data }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        return;
      }

      setNotifications(data);
      localStorage.setItem("notifications", JSON.stringify(notifications));
      const unread = data.some(
        (notification: NotificationProps) => !notification.read
      );
      setHasUnread(unread);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
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
          <NavLink to="/customer-service">
            <CustomerCareIcon />
          </NavLink>
          <NavLink to="/notifications" className="relative">
            <NotificationIcon />
            {hasUnread && (
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
