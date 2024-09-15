import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../../utils/supabaseClient";
import MainContainer from "../../components/containers/MainContainer";
import { InboxIcon, ArrowLeft } from "../../components/icons";
import Spinner from "../../components/defaults/Spinner";

interface NotificationProps {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<number | null>(null);

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
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);

      if (error) {
        console.error("Error updating read status:", error);
      } else {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);

    const notification = notifications.find((n) => n.id === id);
    if (notification && !notification.read) {
      markAsRead(id);
    }
  };

  if (loading) {
    return (
      <MainContainer active="Home">
        <div className="flex justify-center items-center h-[100vh]">
          <Spinner color="#000" />
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer active="Home">
      <div className="flex items-center space-x-4 px-4 pt-10 mb-6">
        <div className="flex">
          <NavLink to="/home" className="bg-[#d9d9d9] p-1.5 rounded-full">
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`px-4 py-2 border-b border-t mt-6 border-gray-200 cursor-pointer flex space-x-3 items-center ${
              notification.read ? "bg-gray-100" : "bg-white"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleExpand(notification.id)}
          >
            <div className="bg-[#f9f3db] p-1 rounded-full">
              <InboxIcon />
            </div>
            <div className="">
              <h3 className="font-semibold text-[14px]">{notification.title}</h3>
              <p className="text-[12px] text-gray-600 mt-1">
                {expanded === notification.id
                  ? notification.message
                  : `${notification.message.substring(0, 50)}...`}
              </p>
              <p className="text-[12px] text-gray-400 mt-1">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </MainContainer>
  );
};

export default Notifications;
