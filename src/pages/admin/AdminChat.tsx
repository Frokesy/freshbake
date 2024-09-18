import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { MessageProps } from "../customer-service";
import ChatWindow from "../../components/admin/defaults/ChatWindow";
import { UserDataProps } from "../home";


const AdminPanel = () => {
  const [users, setUsers] = useState<UserDataProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataProps | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [replyText, setReplyText] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
        const { data, error } = await supabase
          .from("messages")
          .select("sender", { count: "exact", head: true })
          .neq("sender", "admin");
      
        if (error) {
          console.error("Error fetching users:", error);
        } else {
          const userIds = data.map((message) => message.sender);
      
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .in("userId", userIds);
      
          if (userError) {
            console.error("Error fetching user details:", userError);
          } else {
            setUsers(userData as UserDataProps[]);
          }
        }
      };
      
    fetchUsers();
  }, []);

  return (
    <div className="admin-panel">
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer"
            >
              {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages}
            setMessages={setMessages}
            replyText={replyText}
            setReplyText={setReplyText}
          />
        ) : (
          <p>Select a user to view the chat</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
