import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

interface UserProps {
  userId: string;
  firstname: string;
  lastname: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [replyText, setReplyText] = useState<string>("");

  useEffect(() => {
    // Fetch users who have sent messages
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("sender")
        .neq("sender", "admin") // Filter out admin messages
        .group("sender"); // Group by sender (userId)

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        const userIds = data.map((message) => message.sender);
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .in("userId", userIds); // Fetch user details

        if (userError) {
          console.error("Error fetching user details:", userError);
        } else {
          setUsers(userData as UserProps[]);
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
