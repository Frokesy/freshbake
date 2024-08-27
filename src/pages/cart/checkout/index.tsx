import { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import Button from "../../../components/defaults/Button";
import { ArrowLeft, PenEdit } from "../../../components/icons";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const [activeTab, setActiveTab] = useState<string>("delivery");
  return (
    <MainContainer active="Cart">
      <div className="px-4 pt-10">
        <div className="flex items-center space-x-4">
          <div className="flex">
            <NavLink to="/cart" className="bg-[#d9d9d9] p-1.5 rounded-full">
              <ArrowLeft />
            </NavLink>
          </div>
          <h2 className="font-semibold text-[24px]">Checkout</h2>
        </div>

        <div className="max-w-[60%] mt-4 bg-[#d9d9d9] p-1.5 items-center rounded-full text-[14px] flex">
          <p
            onClick={() => setActiveTab("delivery")}
            className={`${
              activeTab === "delivery"
                ? "bg-[#7d6c3a] text-[#fff]"
                : "text-[#808080]"
            } w-[50%] flex justify-center transition-all duration-500 ease-in-out py-1 rounded-full`}
          >
            Delivery
          </p>
          <p
            onClick={() => setActiveTab("pickup")}
            className={`${
              activeTab === "pickup"
                ? "bg-[#7d6c3a] text-[#fff]"
                : "text-[#808080]"
            } w-[50%] flex justify-center transition-all duration-500 ease-in-out py-1 rounded-full`}
          >
            Pickup
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="flex justify-between text-[14px]">
            <p className="">Coconut Bread</p>
            <div className="flex items-center space-x-3">
              <p className="border border-[#ccc] px-1.5 text-[#808080] rounded-full">
                -
              </p>
              <p className="">6</p>
              <p className="border border-[#ccc] px-1.5 text-[#808080] rounded-full">
                +
              </p>
            </div>
          </div>
          <div className="flex text-[14px] items-center justify-between">
            <p className="">800g Family Loaf</p>
            <p>$6</p>
          </div>
          <hr />
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h2 className="font-semibold">Delivery Schedule</h2>
            <p className="text-[14px]">Wednesday</p>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold">Time of Delivery</h2>
            <p className="text-[14px]">09:00 am</p>
          </div>

          {activeTab === "delivery" ? (
            <div className="space-y-2">
              <h2 className="font-semibold">Delivery Address</h2>
              <div className="flex justify-between items-center">
                <p className="text-[14px]">7890 Maple Ridge Road, SK</p>
                <PenEdit />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="font-semibold">Pickup Address</h2>
              <p className="text-[14px]">4088 Kinsella Way SW Edmonton</p>
            </div>
          )}
          <hr />
        </div>

        <div className="mt-4 space-y-4">
          {activeTab === "delivery" ? (
            <div className="space-y-2">
              <h2 className="font-semibold">Customer Information</h2>
              <div className="flex justify-between items-center text-[14px]">
                <p className="">Jackson Adeolu</p>
                <p>+432-657-3953</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="font-semibold">Vendor Information</h2>
              <div className="flex justify-between items-center text-[14px]">
                <p className="">Ayo Ilaro</p>
                <p>+639-382-5684</p>
              </div>
            </div>
          )}
          <hr />
        </div>

        <div className="mt-6 space-y-4 pb-[20vh]">
          <h2 className="font-semibold">Payment Summary</h2>
          <div className="flex justify-between text-[14px]">
            <p className="">Subtotal</p>
            <p className="font-semibold">$36</p>
          </div>
          <div className="flex text-[14px] items-center justify-between">
            <p className="">Delivery Fee</p>
            <p className="font-semibold">$4</p>
          </div>
          {activeTab === "delivery" && (
            <div className="flex text-[14px] items-center justify-between">
              <p className="font-semibold">Delivery Fee</p>
              <p className="font-semibold">$4</p>
            </div>
          )}
          <hr />
        </div>
      </div>

      <div className="fixed px-4 bottom-2 lg:w-[450px] w-[100%] z-50 space-y-6">
        <Button
          filled={true}
          content={
            activeTab === "delivery" ? "Place Order ($40)" : "Place Order ($36)"
          }
          className="text-[18px]"
        />
      </div>
    </MainContainer>
  );
};

export default Checkout;
