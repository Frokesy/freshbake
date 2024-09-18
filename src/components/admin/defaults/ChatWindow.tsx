import { useEffect } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import { MessageProps } from "../../../pages/customer-service";
import { UserDataProps } from "../../../pages/home";

interface ChatWindowProps {
    user: UserDataProps;
    messages: MessageProps[];
    setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
    replyText: string;
    setReplyText: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const ChatWindow = ({
    user,
    messages,
    setMessages,
    replyText,
    setReplyText,
  }: ChatWindowProps) => {
    useEffect(() => {
      const fetchChatHistory = async () => {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("sender", user.userId)
          .or(`sender.eq.admin`)
          .order("timestamp", { ascending: true });
  
        if (error) {
          console.error("Error fetching messages:", error);
        } else {
          setMessages(data as MessageProps[]);
        }
      };
  
      fetchChatHistory();
    }, [user]);
  
    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReplyText(e.target.value);
    };
  
    const sendReply = async () => {
      if (replyText.trim()) {
        const newMessage = {
          sender: "admin",
          name: "Admin",
          message: replyText,
          timestamp: new Date().toISOString(),
        };
  
        const { error } = await supabase
          .from("messages")
          .insert([newMessage]);
  
        if (error) {
          console.error("Error sending message:", error);
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setReplyText("");
        }
      }
    };
  
    return (
      <div className="chat-window">
        <h2>Chat with {user.firstname} {user.lastname}</h2>
        <div className="chat-history">
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={`message ${
                message.sender === "admin" ? "admin-message" : "user-message"
              }`}
            >
              <p>{message.message}</p>
            </div>
          ))}
        </div>
  
        <div className="chat-input">
          <textarea
            value={replyText}
            onChange={handleReplyChange}
            placeholder="Type your message..."
          />
          <button onClick={sendReply}>Send</button>
        </div>
      </div>
    );
  };

  export default ChatWindow
  