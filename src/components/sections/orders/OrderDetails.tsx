import { FC, useState } from "react";
import { OrderItemProps } from "../../../pages/orders";
import { ArrowLeft } from "../../icons";
import Button from "../../defaults/Button";
import TrackOrder from "./TrackOrder";
import PageTransition from "../../defaults/PageTransition";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface OrderDetailsProps {
  clickedOrder: OrderItemProps;
  setClickedOrder: React.Dispatch<
    React.SetStateAction<OrderItemProps | undefined>
  >;
  fromOrderPage?: boolean;
}

const OrderDetails: FC<OrderDetailsProps> = ({
  clickedOrder,
  setClickedOrder,
  fromOrderPage,
}) => {
  const [trackOrder, setTrackOrder] = useState<boolean>(false);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <PageTransition active="Orders">
      <motion.div
        key={trackOrder ? "trackOrder" : "orderDetails"}
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {trackOrder ? (
          <TrackOrder order={clickedOrder} isTracked={setTrackOrder} />
        ) : (
          <div>
            <div className="flex items-center space-x-4 px-4 pt-10">
              <div className="flex">
                {fromOrderPage ? (
                  <NavLink
                    to="/orders"
                    className="bg-[#ccc] p-1.5 rounded-full"
                  >
                    <ArrowLeft />
                  </NavLink>
                ) : (
                  <div
                    onClick={() => setClickedOrder(undefined)}
                    className="bg-[#ccc] p-1.5 rounded-full"
                  >
                    <ArrowLeft />
                  </div>
                )}
              </div>
              <h2 className="font-semibold text-[24px]">
                Order #{clickedOrder?.transactionId}
              </h2>
            </div>

            {clickedOrder?.items.map((item, index) => (
              <div key={index} className="mt-10 px-4 space-y-4 text-[14px]">
                <div className="flex justify-between">
                  <p className="">
                    {item.category} {item?.weight} {item?.type}
                  </p>
                  <p className="">{item.quantity}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Delivery Schedule</p>
                  <p className="">{item.deliveryDay}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Time of delivery</p>
                  <p className="">{item.deliveryTime}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Delivery Address</p>
                  <p className="">7890 Maple Ridge Road, SK</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Status</p>
                  <p
                    className={`${
                      clickedOrder.orderStatus === "Pending" && "text-[#F55B0A]"
                    } ${
                      clickedOrder.orderStatus === "Completed" &&
                      "text-[#005246]"
                    } ${
                      clickedOrder.orderStatus === "Failed" && "text-[#FF0000]"
                    }  ${
                      clickedOrder.orderStatus === "Shipped" && "text-[#d04c95]"
                    } text-[12px]`}
                  >
                    {clickedOrder?.orderStatus}
                  </p>
                </div>

                <div className="pt-10 space-y-4">
                  <div className="flex justify-between text-[14px]">
                    <p className="">Subtotal</p>
                    <p className="font-semibold">{item.totalCost}</p>
                  </div>
                  <div className="flex text-[14px] items-center justify-between">
                    <p className="">Delivery Fee</p>
                    <p className="font-semibold">${clickedOrder.deliveryFee}</p>
                  </div>
                  <div className="flex text-[14px] items-center justify-between">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${clickedOrder.totalCost}</p>
                  </div>
                  <hr />
                </div>

                <div className="pt-10 pb-[20vh]">
                  <div onClick={() => setTrackOrder(true)}>
                    <Button filled content="Track Order" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </PageTransition>
  );
};

export default OrderDetails;
