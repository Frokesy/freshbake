import { FC, useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import { MessageProps } from "../../../pages/customer-service";
import { ArrowLeft, CustomerAvatar, SendIcon } from "../../icons";

interface ChatWindowProps {
  userId: string;
}

const ChatWindow: FC<ChatWindowProps> = ({ userId }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("sender", userId)
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

  // const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setReplyText(e.target.value);
  // };

  // const sendReply = async () => {
  //   if (replyText.trim()) {
  //     const newMessage = {
  //       sender: "admin",
  //       name: "Admin",
  //       message: replyText,
  //       timestamp: new Date().toISOString(),
  //     };

  //     const { error } = await supabase
  //       .from("messages")
  //       .insert([newMessage]);

  //     if (error) {
  //       console.error("Error sending message:", error);
  //     } else {
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       setReplyText("");
  //     }
  //   }
  // };

  console.log(messages);

  return (
    <div className="chat-window">
      <div>
        <div className="msg-body px-4 py-[15vh] text-sm flex flex-col space-y-3">
          {messages.map((message) => (
            <div className="">
              <div className="flex items-center space-x-4 pt-10 fixed top-0 bg-[#fff] w-[100%] pb-3">
                <div className="flex">
                  <div className="bg-[#d9d9d9] p-1.5 rounded-full">
                    <ArrowLeft />
                  </div>
                </div>
                <h2 className="font-semibold text-[18px]">{message.name}</h2>
              </div>

              <div
                key={message.timestamp}
                className={`flex items-start ${
                  message.sender === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === userId ? (
                  <div className="ml-1 order-2">
                    <div className="bg-[#d9d9d9] flex justify-center items-center p-1 rounded-full text-[12px]">
                      {message.name?.charAt(0)}
                    </div>
                  </div>
                ) : (
                  <div className="mr-1">
                    <CustomerAvatar />
                  </div>
                )}
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
              // ref={textareaRef}
              // value={messageText}
              // onChange={handleTextareaChange}
              placeholder="write your message..."
              className="w-[90%] outline-none border-none bg-[#e4e4e4] text-[14px] placeholder:text-[14px] placeholder:text-[#333] resize-none"
              rows={1}
              style={{ overflow: "hidden" }}
            />
            <div
              //    onClick={sendMessage}
              className="cursor-pointer"
            >
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
