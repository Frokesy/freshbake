import { FC } from "react";
import { UserDataProps } from "../../../pages/home";
import { OrderItemProps } from "../../../pages/orders";

interface NewOrdersProps {
  data: { order: OrderItemProps; user: UserDataProps | undefined }[];
}

const NewOrders: FC<NewOrdersProps> = ({ data }) => {
  console.log("data", data);

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      {data.map(({ order, user }) => (
        <div className="" key={order.id}>
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
                <p className="text-[13px]">Order {order.transactionId}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-[12px]">{formatDate(order.created_at)}</h2>
                <p className="text-[13px]">Total: ${order.totalCost}</p>
              </div>
            </div>
          </div>
          <hr />

          {order.items.map(item => (
          <div key={item.id} className="flex flex-col space-y-4 my-4 px-4 text-[14px]">
            <div className="flex justify-between">
              <h2>{item.category} {item.weight} {item.type}</h2>
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
              >
                <option value="">Select</option>
                <option value="">Out for Delivery</option>
                <option value="">Pickup</option>
              </select>
            </div>
          </div>
          ))}
        </div>
      ))}

      <hr />
    </div>
  );
};

export default NewOrders;
