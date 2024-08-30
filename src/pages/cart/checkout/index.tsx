import { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import Button from "../../../components/defaults/Button";
import { ArrowLeft, PenEdit } from "../../../components/icons";
import { NavLink } from "react-router-dom";
import { CartItemProps } from "..";

const Checkout = () => {
  const [activeTab, setActiveTab] = useState<string>("delivery");
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const idb = window.indexedDB;

  const getCartItems = () => {
    const dbPromise = idb.open("freshbake", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("cart", "readonly");
      const cart = tx.objectStore("cart");
      const data = cart.getAll();

      data.onsuccess = (query) => {
        if (query.srcElement) {
          setCartItems((query.srcElement as IDBRequest).result);
        }
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };
  
  useEffect(() => {
    getCartItems();
  });

  const totalCost = cartItems.reduce((sum, item) => sum + item.totalCost, 0);
  const deliveryFee = activeTab === "delivery" ? 4 : 0;
  const finalTotal = totalCost + deliveryFee;

  return (
    <MainContainer active="Cart">
      <div className="">
        <div className="fixed top-0 bg-[#fff] w-[100%]">
          <div className="flex items-center space-x-4 px-4 pt-10">
            <div className="flex">
              <NavLink to="/cart" className="bg-[#d9d9d9] p-1.5 rounded-full">
                <ArrowLeft />
              </NavLink>
            </div>
            <h2 className="font-semibold text-[24px]">Checkout</h2>
          </div>

          <div className="max-w-[60%] mt-4 mb-2 mx-4 bg-[#d9d9d9] p-1.5 items-center rounded-full text-[14px] flex">
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
        </div>

        <div className="space-y-10 pt-[20vh] px-4">
          {cartItems.map((item, index) => (
            <div className="" key={item.id}>
              <div className="mt-6 space-y-4">
                <h2 className="font-semibold">Order Summary {index + 1}</h2>
                <div className="flex justify-between text-[14px]">
                  <p className="">{item.category}</p>
                  <div className="flex items-center space-x-3">
                    <p className="border border-[#ccc] px-1.5 text-[#808080] rounded-full">
                      -
                    </p>
                    <p className="">{item.quantity}</p>
                    <p className="border border-[#ccc] px-1.5 text-[#808080] rounded-full">
                      +
                    </p>
                  </div>
                </div>
                <div className="flex text-[14px] items-center justify-between">
                  <p className="">
                    {item.weight} {item.type}
                  </p>
                  <p>${item.price}</p>
                </div>
                <div className="flex text-[14px] items-center justify-between">
                  <p className="font-semibold">Total (qty * price)</p>
                  <p className="font-semibold">${item.totalCost}</p>
                </div>
                <hr />
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <h2 className="font-semibold">Delivery Schedule</h2>
                  <p className="text-[14px]">{item.deliveryDay}</p>
                </div>
                <div className="space-y-2">
                  <h2 className="font-semibold">Time of Delivery</h2>
                  <p className="text-[14px]">{item.deliveryTime}</p>
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
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-4 px-4">
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

        <div className="mt-6 space-y-4 pb-[20vh] px-4">
          <h2 className="font-semibold">Payment Summary</h2>
          <div className="flex justify-between text-[14px]">
            <p className="">Subtotal</p>
            <p className="font-semibold">${totalCost}</p>
          </div>
          {activeTab === "delivery" && (
            <div className="flex text-[14px] items-center justify-between">
              <p className="">Delivery Fee</p>
              <p className="font-semibold">${deliveryFee}</p>
            </div>
          )}
          <div className="flex text-[14px] items-center justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">${finalTotal}</p>
          </div>
          <hr />
        </div>
      </div>

      <div className="fixed px-4 bottom-2 lg:w-[450px] w-[100%] z-50 space-y-6">
        <Button
          filled={true}
          content={`Place Order ($${finalTotal})`}
          className="text-[18px]"
        />
      </div>
    </MainContainer>
  );
};

export default Checkout;
