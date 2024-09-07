import { FC, useState } from "react";
import { AllOrdersProps } from "./NewOrders";
import { motion, AnimatePresence } from "framer-motion";

const CompleteOrders: FC<AllOrdersProps> = ({ data }) => {
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const deliveredOrders = data.filter(
    ({ order }) => order.orderStatus === "Delivered"
  );

  const handleClick = (orderId: number) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <div className="pb-[20vh] text-[14px]">
      {deliveredOrders.length > 0 ? (
        <div>
          {deliveredOrders.map(({ order, user }) => (
            <div key={order.id} className="mb-4 border rounded-lg">
              <div
                className="px-4 mt-6 mb-3 text-[14px] flex items-center space-x-3 cursor-pointer"
                onClick={() => handleClick(order.transactionId)}
              >
                <h2 className="bg-[#ccc] p-2 rounded-full">
                  {user?.firstname.slice(0, 1)}
                  {user?.lastname.slice(0, 1)}
                </h2>
                <div className="flex flex-col space-y-1 w-[100%]">
                  <div className="flex justify-between">
                    <h2 className="font-semibold">
                      {user?.firstname} {user?.lastname}
                    </h2>
                    <p className="text-[13px]">Order {order.transactionId}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-[12px]">{formatDate(order.created_at)}</h2>
                    <p className="text-[13px]">Total: ${order.totalCost}</p>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {openOrderId === order.transactionId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <hr />
                    {order.items.map((item, index) => (
                      <div key={item.id} className="py-4">
                        <div className="flex flex-col space-y-4">
                          <div className="flex justify-between">
                            <h2>
                              {item.category} {item.weight} {item.type}
                            </h2>
                            <p>Qty: {item.quantity}</p>
                          </div>
                          <div className="flex justify-between">
                            <h2>Delivery Schedule</h2>
                            <p>{item.deliveryDay}</p>
                          </div>
                          <div className="flex justify-between">
                            <h2>Time of Delivery</h2>
                            <p>{item.deliveryTime}</p>
                          </div>
                          <div className="flex justify-between">
                            <h2>Delivery Address</h2>
                            <p className="text-[#bd9e1e]">{order.deliveryAddress}</p>
                          </div>
                          <div className="flex justify-between">
                            <h2>Phone Number</h2>
                            <p>{user?.phone}</p>
                          </div>
                          {index === order.items.length - 1 && (
                            <div className="flex justify-center items-center">
                              <h2 className="text-[#20685d] font-semibold">
                                Order Status: Order Delivered
                              </h2>
                            </div>
                          )}
                        </div>
                        <hr />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-[#808080] font-semibold italic">
            No completed orders
          </p>
        </div>
      )}
    </div>
  );
};

export default CompleteOrders;
