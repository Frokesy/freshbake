import { FC } from "react";
import { OrderItemProps } from ".";
import { ArrowLeft } from "../../components/icons";
import Button from "../../components/defaults/Button";

interface OrderDetailsProps {
  clickedOrder: OrderItemProps | undefined;
  setClickedOrder: React.Dispatch<
    React.SetStateAction<OrderItemProps | undefined>
  >;
}

const OrderDetails: FC<OrderDetailsProps> = ({
  clickedOrder,
  setClickedOrder,
}) => {
  return (
    <div>
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div
            onClick={() => setClickedOrder(undefined)}
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">
          Order #{clickedOrder?.orderNo}
        </h2>
      </div>

      <div className="mt-10 px-4 space-y-4 text-[14px]">
        <div className="flex justify-between">
          <p className="">
            {clickedOrder?.category} {clickedOrder?.weight} {clickedOrder?.type}
          </p>
          <p className="">6</p>
        </div>
        <div className="flex justify-between">
          <p className="">Delivery Schedule</p>
          <p className="">Wednesday</p>
        </div>
        <div className="flex justify-between">
          <p className="">Time of delivery</p>
          <p className="">09:00 am</p>
        </div>
        <div className="flex justify-between">
          <p className="">Delivery Address</p>
          <p className="">7890 Maple Ridge Road, SK</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Status</p>
          <p
            className={`${
              clickedOrder?.orderStatus === "Pending" && "text-[#F55B0A]"
            } ${
              clickedOrder?.orderStatus === "Completed" && "text-[#005246]"
            } ${clickedOrder?.orderStatus === "Failed" && "text-[#FF0000]"}`}
          >
            {clickedOrder?.orderStatus}
          </p>
        </div>

        <div className="pt-10 space-y-4">
          <div className="flex justify-between text-[14px]">
            <p className="">Subtotal</p>
            <p className="font-semibold">$36</p>
          </div>
          <div className="flex text-[14px] items-center justify-between">
            <p className="">Delivery Fee</p>
            <p className="font-semibold">$4</p>
          </div>
          <div className="flex text-[14px] items-center justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">$40</p>
          </div>
          <hr />
        </div>

        <div className="pt-10 pb-[20vh]">
            <div>
              <Button filled content="Track Order" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default OrderDetails;
