import { NavLink } from "react-router-dom";
import { ArrowLeft, CustomerAvatar, SendIcon } from "../../components/icons";
import { useEffect, useState } from "react";
import { UserDataProps } from "../home";
import { supabase } from "../../../utils/supabaseClient";

const LiveSupport = () => {
  const [userData, setUserData] = useState<UserDataProps>();

  const messages = [
    {
      id: 1,
      sender: userData?.userId,
      message: "Hello World",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      sender: userData?.userId,
      message: "Hello Admin, I have a complaint",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      sender: "admin",
      message: "Hello Dear User, Can we have your complaint?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 4,
      sender: userData?.userId,
      message:
        "I have a issue with resetting my password, It just keeps loading without a poitive response",
      timestamp: new Date().toISOString(),
    },
    {
      id: 5,
      sender: "admin",
      message:
        "We're sorry about that, we'll send you an email prior to that soon, do have a good day!",
      timestamp: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("userId", user.id);
        if (!error) {
          data.map((data) => setUserData(data));
        } else {
          console.log(error);
        }
      }
    };
    getUser();
  }, []);
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
      <div className="msg-body px-4 py-[15vh] text-sm flex flex-col space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
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
      <div className="fixed bottom-0 pb-6 bg-[#fff] pt-2 w-[100%] px-4">
        <div className="flex justify-between px-4 py-3 rounded-lg items-center bg-[#e4e4e4]">
          <textarea
            placeholder="write your message..."
            className="w-[90%] outline-none border-none bg-[#e4e4e4] text-[14px] placeholder:text-[14px] placeholder:text-[#333]"
          />
          <div className="">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
