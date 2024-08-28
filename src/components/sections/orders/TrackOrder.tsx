import { FC } from "react";
import { OrderItemProps } from "../../../pages/orders";
import { ArrowLeft, OrderCheck, UncheckedOrder } from "../../icons";
import PageTransition from "../../defaults/PageTransition";

interface TrackOrderProps {
  order: OrderItemProps | undefined;
  isTracked: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrackOrder: FC<TrackOrderProps> = ({ order, isTracked }) => {
  return (
    <PageTransition active="Orders">
      <div className="bg-[#ccc] h-[400px]">
        <div
          onClick={() => isTracked(false)}
          className="flex absolute left-6 top-10 bg-[#d9d9d9] p-2 rounded-full"
        >
          <ArrowLeft />
        </div>
        <img src="/assets/dummyMap.png" alt="img" />
      </div>

      <div className="px-4 pt-10 pb-[20vh]">
        <h2 className="font-semibold text-[20px]">Delivery</h2>
        <p className="text-[14px]">Estimated Arrival: 3 Days, 14 Hours</p>

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
              order?.orderStatus === "Shipped" ||
              order?.orderStatus === "Completed"
                ? "bg-[#C68A00]"
                : "bg-[#d8cdab]"
            } w-[60px] h-[8px] rounded-full`}
          ></div>
          <div>
            {order?.orderStatus === "Shipped" ||
            order?.orderStatus === "Completed" ? (
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
              order?.orderStatus === "Completed"
                ? "bg-[#C68A00]"
                : "bg-[#d8cdab]"
            } w-[60px] h-[8px] rounded-full`}
          ></div>{" "}
          <div>
            {order?.orderStatus === "Completed" ? (
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
            <p className="">Jackson Adeolu</p>
            <p className="">+432-657-3953</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrackOrder;
