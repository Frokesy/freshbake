import { FC } from 'react';
import { OrderItemProps } from '../../../pages/orders'
import { ArrowLeft } from '../../icons'
interface OrderOverviewProps {
    orderItems: OrderItemProps[];
    setClickedOrder: React.Dispatch<React.SetStateAction<OrderItemProps | undefined>>;
}
const OrderOverview: FC<OrderOverviewProps> = ({ orderItems, setClickedOrder }) => {
  return (
    <div>
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">Orders</h2>
      </div>

      <div className="space-y-6 mt-10">
        {orderItems.map((item) => (
          <div onClick={() => setClickedOrder(item)} className="space-y-3 text-[14px] px-4" key={item.id}>
            <div className="flex justify-between">
              <h2 className="font-semibold">
                {item.type} - {item.weight} {item.category}
              </h2>
              <p className="text-[12px]">Order {item.orderNo}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px]">{item.orderDate}</p>
              <p
                className={`${
                  item.orderStatus === "Pending" && "text-[#F55B0A]"
                } ${item.orderStatus === "Completed" && "text-[#005246]"} ${
                  item.orderStatus === "Failed" && "text-[#FF0000]"
                }  ${item.orderStatus === "Shipped" && "text-[#d04c95]"} text-[12px]`}
              >
                {item.orderStatus}
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderOverview