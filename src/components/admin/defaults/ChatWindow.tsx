import { FC, useEffect, useRef, useState } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import { MessageProps } from "../../../pages/customer-service";
import { ArrowLeft, SendIcon } from "../../icons";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow: FC<ChatWindowProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [replyText, setReplyText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chatId", chatId)
      .order("timestamp", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else if (data) {
      setMessages(data as MessageProps[]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };
  const generateChatId = (): string => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const sendReply = async () => {
    if (replyText.trim()) {
      const chatId =
        messages.length > 0 ? messages[0].chatId : generateChatId();
      const newMessage = {
        sender: "admin",
        name: "Admin",
        message: replyText,
        timestamp: new Date().toISOString(),
        chatId: chatId,
      };

      const { error } = await supabase.from("messages").insert([newMessage]);

      if (error) {
        console.error("Error sending message:", error);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setReplyText("");
        console.log(chatId);
      }
    }
  };

  console.log(messages);

  return (
    <div className="chat-window">
      <div>
        <div className="msg-body px-4 py-[15vh] text-sm flex flex-col space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="">
              <div className="flex items-center space-x-4 pt-10 fixed top-0 bg-[#fff] w-[100%] pb-3">
                <div className="flex">
                  <div className="bg-[#d9d9d9] p-1.5 rounded-full">
                    <ArrowLeft />
                  </div>
                </div>
                <h2 className="font-semibold text-[18px]">{messages[0].name}</h2>
              </div>

              <div
                key={message.timestamp}
                className={`flex items-start ${
                  message.sender === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === "admin" ? "bg-[#98c0c5]" : "bg-[#f4e8b7]"
                  } p-3 rounded-lg max-w-[260px]`}
                >
                  <h2>{message.message}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 pb-6 bg-[#fff] pt-2 w-[100%] px-4">
          <div className="flex justify-between px-4 py-3 rounded-lg items-center bg-[#e4e4e4]">
            <textarea
              ref={textareaRef}
              value={replyText}
              onChange={handleReplyChange}
              placeholder="write your message..."
              className="w-[90%] outline-none border-none bg-[#e4e4e4] text-[14px] placeholder:text-[14px] placeholder:text-[#333] resize-none"
              rows={1}
              style={{ overflow: "hidden" }}
            />
            <div onClick={sendReply} className="cursor-pointer">
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
