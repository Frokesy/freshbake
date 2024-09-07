import { FC, useState } from "react";
import { UserDataProps } from "../../../pages/home";
import { OrderItemProps } from "../../../pages/orders";
import { supabase } from "../../../../utils/supabaseClient";
import ConfirmOrderStatusChange from "../../modals/ConfirmOrderStatusChange";
import { Bounce, toast, ToastContainer } from "react-toastify";

export interface AllOrdersProps {
  data: { order: OrderItemProps; user: UserDataProps | undefined }[];
}

const NewOrders: FC<AllOrdersProps> = ({ data }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    orderId: number;
    newStatus: string;
  } | null>(null);

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const getResponse = async (response: string) => {
    setOpenConfirmationModal(false);
    if (response === "yes" && selectedOrder) {
      const { orderId, newStatus } = selectedOrder;
      try {
        const { error } = await supabase
          .from("orders")
          .update({ orderStatus: newStatus })
          .eq("transactionId", orderId);
        if (!error) {
          console.log(newStatus)
          toast.success(
            "The order status has been updated, the user will be sent a mail to this effect",
            {
              position: "top-right",
              theme: "light",
              autoClose: 2000,
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: true,
              transition: Bounce,
            }
          );
        }
      } catch (error) {
        console.error("Failed to update order status", error);
      }
    }
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setSelectedOrder({ orderId, newStatus });
    setOpenConfirmationModal(true);
  };

  return (
    <div>
      <ToastContainer />
      {data.length > 0 ? (
        <div className="">
          {data.map(({ order, user }) => (
            <div key={order.id} className="">
              {order.orderStatus !== "Delivered" ? (
                <div className="" key={user?.id}>
                  <div className="px-4 mt-6 mb-3 text-[14px] flex items-center space-x-3">
                    <h2 className="bg-[#ccc] p-2 rounded-full">
                      {user?.firstname.slice(0, 1)}
                      {user?.lastname.slice(0, 1)}
                    </h2>
                    <div className="flex flex-col space-y-1 w-[100%]">
                      <div className="flex justify-between">
                        <h2 className="font-semibold">
                          {user?.firstname} {user?.lastname}
                        </h2>
                        <p className="text-[13px]">
                          Order {order.transactionId}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-[12px]">
                          {formatDate(order.created_at)}
                        </h2>
                        <p className="text-[13px]">Total: ${order.totalCost}</p>
                      </div>
                    </div>
                  </div>
                  <hr />

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col space-y-4 my-4 px-4 text-[14px]"
                    >
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
                        <p className="text-[#bd9e1e]">
                          {order.deliveryAddress}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <h2>Phone Number</h2>
                        <p>{user?.phone}</p>
                      </div>
                      <div className="flex justify-between">
                        <h2>Sub-total</h2>
                        <p>${item.totalCost}</p>
                      </div>
                      <div className="flex justify-between">
                        <h2>Delivery Fee</h2>
                        <p>${order.deliveryFee}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h2>Order Status</h2>
                        <select
                          name="status"
                          id="status"
                          className="outline-none p-3 rounded-lg bg-[#fff] shadow-lg"
                          value={order.orderStatus}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            handleStatusChange(order.transactionId, newStatus);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[70vh] flex items-center justify-center">
                  <p className="text-[#808080] font-semibold italic">
                    No new orders
                  </p>
                </div>
              )}
            </div>
          ))}
          <hr />
        </div>
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-[#808080] font-semibold italic">No new orders</p>
        </div>
      )}

      {openConfirmationModal && (
        <ConfirmOrderStatusChange getResponse={getResponse} />
      )}
    </div>
  );
};

export default NewOrders;
