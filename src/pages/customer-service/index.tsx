import { NavLink } from "react-router-dom";
import { ArrowLeft, CustomerAvatar, SendIcon } from "../../components/icons";
import { useEffect, useState, useRef } from "react";
import { UserDataProps } from "../home";
import { supabase } from "../../../utils/supabaseClient";
import Spinner from "../../components/defaults/Spinner";

export interface MessageProps {
  id?: string;
  timestamp: string | undefined;
  chatId?: string;
  sender: string | undefined;
  name: string | undefined;
  message: string | undefined;
}

const LiveSupport = () => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const hasRun = useRef(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("userId", user.id);
      if (!error && data.length > 0) {
        const fetchedUserData = data[0];
        setUserData(fetchedUserData);

        const adminMsg = [
          {
            sender: "admin",
            name: `${fetchedUserData.firstname} ${fetchedUserData.lastname}`,
            message: `Hello, ${fetchedUserData.firstname}! \n How can we assist you today?`,
            timestamp: new Date().toISOString(),
          },
        ];
        setMessages((prevMessages) => [
          ...(adminMsg as MessageProps[]),
          ...prevMessages,
        ]);
      } else {
        console.log(error);
      }
    }
  };

  const fetchMessages = async () => {
    if (!userData) return;
    setLoadingMessages(true)

    const { data: userMessages, error: userError } = await supabase
      .from("messages")
      .select("*")
      .eq("sender", userData.userId)
      .order("timestamp", { ascending: true });

    if (userError) {
      console.error("Error fetching user messages:", userError);
      return;
    }

    if (userMessages) {
      const chatIds = Array.from(
        new Set(userMessages.map((msg) => msg.chatId))
      );

      const { data: allMessages, error: allError } = await supabase
        .from("messages")
        .select("*")
        .in("chatId", chatIds)
        .order("timestamp", { ascending: true });

      if (allError) {
        console.error("Error fetching all messages:", allError);
      } else if (allMessages) {
        setMessages((prevMessages) => [
          ...prevMessages,
          ...(allMessages as MessageProps[]),
        ]);
      }
    }
    setLoadingMessages(false)
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      getUser();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchMessages();
    }
  }, [userData]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    setMessageText(e.target.value);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const generateChatId = (): string => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const sendMessage = async () => {
    const chatId = messages.length > 0 ? messages[1].chatId : generateChatId();
    if (messageText.trim()) {
      const newMessage = {
        sender: userData?.userId,
        name: `${userData?.firstname} ${userData?.lastname}`,
        message: messageText,
        timestamp: new Date().toISOString(),
        chatId: chatId,
      };

      const { data, error } = await supabase
        .from("messages")
        .insert([newMessage]);

      if (error) {
        console.error("Error sending message:", error);
      } else {
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageText("");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4 px-4 pt-10 fixed top-0 bg-[#fff] w-[100%] pb-3">
        <div className="flex">
          <NavLink to="/home" className="bg-[#d9d9d9] p-1.5 rounded-full">
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Customer Support</h2>
      </div>

      {loadingMessages ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Spinner color="#000" />
        </div>
      ) : (
        <div className="msg-body px-4 py-[15vh] text-sm flex flex-col space-y-3">
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={`flex items-start ${
                message.sender === userData?.userId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender === userData?.userId ? (
                <div className="ml-1 order-2">
                  <div className="bg-[#d9d9d9] flex justify-center items-center p-1 rounded-full text-[12px]">
                    {userData?.firstname?.charAt(0)}
                    {userData?.lastname?.charAt(0)}
                  </div>
                </div>
              ) : (
                <div className="mr-1">
                  <CustomerAvatar />
                </div>
              )}
              <div
                className={`${
                  message.sender === userData?.userId
                    ? "bg-[#98c0c5]"
                    : "bg-[#f4e8b7]"
                } p-3 rounded-lg max-w-[260px]`}
              >
                <h2>{message.message}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 pb-6 bg-[#fff] pt-2 w-[100%] px-4">
        <div className="flex justify-between px-4 py-3 rounded-lg items-center bg-[#e4e4e4]">
          <textarea
            ref={textareaRef}
            value={messageText}
            onChange={handleTextareaChange}
            placeholder="write your message..."
            className="w-[90%] outline-none border-none bg-[#e4e4e4] text-[14px] placeholder:text-[14px] placeholder:text-[#333] resize-none"
            rows={1}
            style={{ overflow: "hidden" }}
          />
          <div onClick={sendMessage} className="cursor-pointer">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
