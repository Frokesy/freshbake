import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import PageTransition from "../../components/defaults/PageTransition";

interface MessageDataProps {
  id?: string;
  timestamp: string | undefined;
  sender: string | undefined;
  name: string | undefined;
  message: string | undefined;
}

const AdminPanel = () => {
  const [data, setData] = useState<MessageDataProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<MessageDataProps>()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .neq("sender", "admin");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setData(data);
      }
    };

    fetchUsers();
  }, []);

  console.log(data);
  return (
    <PageTransition active="customer-service">
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {data.map((msg) => (
            <li
              key={msg.id}
              onClick={() => setSelectedUser(msg)}
              className="cursor-pointer"
            >
                {msg.name}
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
};

export default AdminPanel;
