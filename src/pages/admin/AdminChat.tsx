import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import PageTransition from "../../components/defaults/PageTransition";

interface MessageDataProps {
  id?: string;
  timestamp: string;
  sender: string | undefined;
  name: string | undefined;
  message: string | undefined;
}

const AdminPanel = () => {
  const [data, setData] = useState<MessageDataProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<MessageDataProps>();

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

  console.log(data);
  return (
    <PageTransition active="customer-service">
      <div className="user-list">
        <h2>Users</h2>
        <div>
          {data.map((msg) => (
            <div key={msg.id} className="">
              <p
                onClick={() => setSelectedUser(msg)}
                className="cursor-pointer"
              >
                {msg.name}
              </p>
              <p>{msg.message}</p>
              <p>{formatTimestamp(msg.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminPanel;
