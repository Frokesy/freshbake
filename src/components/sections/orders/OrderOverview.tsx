import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OrderItemProps } from "../../../pages/orders";
import { ArrowLeft, ArrowDown } from "../../icons";
import { NavLink } from "react-router-dom";
import OrdersSkeleton from "../../skeletons/OrdersSkeleton";

interface OrderOverviewProps {
  orderItems: OrderItemProps[] | undefined;
  setClickedOrder: React.Dispatch<
    React.SetStateAction<OrderItemProps | undefined>
  >;
}

const OrderOverview: FC<OrderOverviewProps> = ({
  orderItems,
  setClickedOrder,
}) => {
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(
    null
  );
  const [groupedOrders, setGroupedOrders] = useState<Record<string, OrderItemProps[]> | null>(null);

  useEffect(() => {
    if (orderItems) {
      const grouped = orderItems.reduce((acc, order) => {
        if (!acc[order.transactionId]) {
          acc[order.transactionId] = [];
        }
        acc[order.transactionId].push(order);
        return acc;
      }, {} as Record<string, OrderItemProps[]>);
      setGroupedOrders(grouped);
    }
  }, [orderItems]);

  return (
    <div>
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <NavLink to="/home" className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Orders</h2>
      </div>

      {!orderItems ? (
        <OrdersSkeleton />
      ) : orderItems.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-[#808080] font-semibold italic">
            No recent orders
          </p>
        </div>
      ) : (
        <div className="mt-8 pb-[20vh]">
          {groupedOrders &&
            Object.entries(groupedOrders).map(([transactionId, orders]) => (
              <div key={transactionId} className="mb-4">
                <div
                  onClick={() =>
                    setExpandedTransaction(
                      expandedTransaction === transactionId
                        ? null
                        : transactionId
                    )
                  }
                  className="cursor-pointer flex items-center justify-between px-4 py-2 bg-gray-100"
                >
                  <h2 className="font-semibold">Order {transactionId}</h2>
                  <motion.div
                    animate={{
                      rotate: expandedTransaction === transactionId ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowDown />
                  </motion.div>
                </div>

                {expandedTransaction === transactionId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    {orders.map((order) =>
                      order.items.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setClickedOrder(order)}
                          className="space-y-3 text-[14px] py-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-3">
                              <h2 className="font-semibold">
                                {item.type} - {item.weight} {item.category}
                              </h2>
                              <p className="text-[12px]">
                                {item.deliveryDay} - {item.deliveryTime}
                              </p>
                            </div>
                            <p
                              className={`${
                                order.orderStatus === "Processing" &&
                                "text-[#F55B0A]"
                              } ${
                                order.orderStatus === "Delivered" &&
                                "text-[#005246]"
                              } ${
                                order.orderStatus === "Failed" &&
                                "text-[#FF0000]"
                              }  ${
                                order.orderStatus === "Out for Delivery" &&
                                "text-[#d04c95]"
                              } text-[12px]`}
                            >
                              {order.orderStatus}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrderOverview;
