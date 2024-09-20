import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import PageTransition from "../../components/defaults/PageTransition";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "../../components/icons";
import ChatWindow from "../../components/admin/defaults/ChatWindow";

interface MessageDataProps {
  id?: string;
  timestamp: string;
  sender: string;
  name: string | undefined;
  message: string | undefined;
}

const AdminPanel = () => {
  const [data, setData] = useState<MessageDataProps[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const daySuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const month = date.toLocaleString("default", { month: "short" });

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}${daySuffix(day)} ${month} at ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .neq("sender", "admin");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        const latestMessagesBySender = Array.from(
          data.reduce<Map<string, MessageDataProps>>((map, message) => {
            const currentTimestamp = new Date(message.timestamp).getTime();
            const existingMessage = map.get(message.sender);

            if (
              !existingMessage ||
              currentTimestamp > new Date(existingMessage.timestamp).getTime()
            ) {
              map.set(message.sender, message);
            }
            return map;
          }, new Map())
        ).map(([, message]) => message);
        setData(latestMessagesBySender);
      }
    };

    fetchUsers();
  }, []);

  return (
    <PageTransition active="customer-service">
      {selectedUserId ? (
        <ChatWindow userId={selectedUserId} />
      ) : (
        <div className="user-list">
        <div className="flex items-center space-x-4 px-4 pt-10 bg-[#fff] w-[100%] pb-3">
          <div className="flex">
            <NavLink
              to="/admin/admin-profile"
              className="bg-[#d9d9d9] p-1.5 rounded-full"
            >
              <ArrowLeft />
            </NavLink>
          </div>
          <h2 className="font-semibold text-[20px]">Customer Support</h2>
        </div>
        <div className="space-y-3 mt-4">
          {data.map((msg) => (
            <div key={msg.id} className="border border-[#ccc] px-4 py-2 flex justify-between items-center">
              <div className="max-w-[70%]">
                <p
                  onClick={() => setSelectedUserId(msg.sender)}
                  className="cursor-pointer font-semibold"
                >
                  {msg.name}
                </p>
                <p className="text-[14px]">{msg.message}</p>
              </div>
              <p className="text-[12px]">{formatTimestamp(msg.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
      )}
    </PageTransition>
  );
};

export default AdminPanel;
