import { FC, useEffect, useState } from "react";
import { OrderItemProps } from "../../../pages/orders";
import { ArrowLeft, OrderCheck, UncheckedOrder } from "../../icons";
import PageTransition from "../../defaults/PageTransition";
import { supabase } from "../../../../utils/supabaseClient";
import { UserDataProps } from "../../../pages/home";

interface TrackOrderProps {
  order: OrderItemProps | undefined;
  isTracked: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrackOrder: FC<TrackOrderProps> = ({ order, isTracked }) => {
  const [userData, setUserData] = useState<UserDataProps>()
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
            data.map((data) => setUserData(data))
          } else {
            console.log(error)
          }
      }
    };
    getUser();
  }, []);
  return (
    <PageTransition active="Orders">
      <div className="bg-[#ccc] h-[400px]">
        <div
          onClick={() => isTracked(false)}
          className="flex absolute left-6 top-10 bg-[#d9d9d9] p-2 rounded-full"
        >
          <ArrowLeft />
        </div>
        <img src="/assets/dummyMap.png" alt="img" className="w-[100%]" />
      </div>

      <div className="px-4 pt-10 pb-[20vh]">
        <h2 className="font-semibold text-[20px]">Delivery Day and time</h2>
        <p className="text-[14px]">Next {order?.items[0].deliveryDay} - {order?.items[0].deliveryTime}</p>

        <div className="pt-8 flex justify-between items-center text-[14px] space-x-4">
          <div className="">
            {order?.orderStatus !== "Failed" ? (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <OrderCheck />
                <p>Order Accepted</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <UncheckedOrder />
                <p>Order Accepted</p>
              </div>
            )}
          </div>
          <div
            className={`${
              order?.orderStatus === "Out for Delivery" ||
              order?.orderStatus === "Delivered"
                ? "bg-[#C68A00]"
                : "bg-[#d8cdab]"
            } w-[60px] h-[8px] rounded-full`}
          ></div>
          <div>
            {order?.orderStatus === "Out for Delivery" ||
            order?.orderStatus === "Delivered" ? (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <OrderCheck />
                <p>Out for Delivery</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <UncheckedOrder />
                <p>Out for Delivery</p>
              </div>
            )}
          </div>
          <div
            className={`${
              order?.orderStatus === "Delivered"
                ? "bg-[#C68A00]"
                : "bg-[#d8cdab]"
            } w-[60px] h-[8px] rounded-full`}
          ></div>{" "}
          <div>
            {order?.orderStatus === "Delivered" ? (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <OrderCheck />
                <p>Delivered</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-2 font-light">
                <UncheckedOrder />
                <p>Delivered</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold">Customer Information</h2>

          <div className="flex justify-between mt-2 text-[14px]">
            <p className="">{userData?.firstname} {userData?.lastname}</p>
            <p className="">{userData?.phone}</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrackOrder;
