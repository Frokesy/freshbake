import { ArrowLeft } from "../../icons";
import Spinner from "../../defaults/Spinner";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../../defaults/Button";
import { CheckoutDataProps } from "../../../pages/cart/checkout";
import { useNavigate } from "react-router-dom";

interface PaymentProps {
  checkoutData: CheckoutDataProps | undefined;
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const Payment: FC<PaymentProps> = ({ checkoutData, setActiveScreen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setLoading(true);
    const data = checkoutData;
    navigate("/success", { state: { data } });
  };

  return (
    <>
      <div className="px-4">
        <div className="flex items-center space-x-4 pt-10">
          <div className="flex">
            <div
              onClick={() => setActiveScreen("precheckout")}
              className="bg-[#ccc] p-1.5 rounded-full"
            >
              <ArrowLeft />
            </div>
          </div>
          <h2 className="font-semibold text-[24px]">Complete Order</h2>
        </div>
        {checkoutData?.cartItems.map((item, index) => (
          <div className="mt-6 space-y-4" key={index}>
            <h2 className="font-semibold">Order Summary {index + 1}</h2>
            <div className="flex justify-between text-[14px]">
              <p className="">{item.category}</p>
              <div className="flex items-center space-x-3">
                <p className="">{item.quantity}</p>
              </div>
            </div>
            <div className="flex text-[14px] items-center justify-between">
              <p className="">
                {item.weight} {item.type}
              </p>
              <p>${item.price}</p>
            </div>
            <div className="flex text-[14px] space-y-4 flex-col">
              <p className="font-semibold">
                Subtotal ${parseFloat(item.price) * item.quantity}
              </p>
              <p className="font-semibold">
                Delivery Fee ${checkoutData.deliveryFee}
              </p>
              <p className="font-semibold">
                Total ${checkoutData.totalCost + checkoutData.deliveryFee}
              </p>
            </div>
            <hr />
          </div>
        ))}
        <h2 className="mt-6">
          Interac account:
          <span className="text-[#7d6c3a] font-semibold">
            {" "}
            freshlagosbread@gmail.com
          </span>
          .
        </h2>
      </div>
      <div
        onClick={() => handlePayment()}
        className="fixed px-4 bottom-6 lg:w-[450px] w-[100%] z-50 space-y-6"
      >
        <Button
          filled={true}
          content={loading ? <Spinner /> : `Click after making payment`}
          className="text-[18px]"
        />
      </div>
    </>
  );
};

export default Payment;
