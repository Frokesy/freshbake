import { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import Button from "../../../components/defaults/Button";
import { ArrowLeft, PenEdit } from "../../../components/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { CartItemProps } from "..";
import { UserDataProps } from "../../home";
import { supabase } from "../../../../utils/supabaseClient";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { PaymentSuccessful } from "../../../components/email-templates/PaymentSuccessful";
import { render } from "@react-email/render";
import Plunk from "@plunk/node";
import Spinner from "../../../components/defaults/Spinner";

const Checkout = () => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [activeTab, setActiveTab] = useState<string>("delivery");
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const idb = window.indexedDB;

  const navigate = useNavigate();

  const plunkClient = new Plunk(
    "sk_be82d7ea662e6422f5b77d4f9f17153cdf7e2aedd142e35e"
  );

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
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("userId", user.id);
        if (!error) {
          data.map((data) => setUserData(data));
        } else {
          console.log(error);
        }
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    getCartItems();
  });

  const totalCost = cartItems.reduce((sum, item) => sum + item.totalCost, 0);
  const deliveryFee = activeTab === "delivery" ? 4 : 0;
  const finalTotal = totalCost + deliveryFee;

  const config = {
    public_key: "FLWPUBK_TEST-7fb6d77c1dd8f4f4b933f84b1bb51e0d-X",
    tx_ref: `${Date.now()}`,
    amount: finalTotal,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userData?.email as string,
      phone_number: userData?.phone as string,
      name: `${userData?.firstname} ${userData?.lastname}` as string,
    },
    customizations: {
      title: "Freshbake",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const sendOrderConfirmationEmail = async (
    userData: UserDataProps | undefined,
    cartItems: CartItemProps[],
    finalTotal: number,
    orderId: number,
    activeTab: string,
    deliveryFee: number
  ) => {
    try {
      const emailHtml = render(
        <PaymentSuccessful
          userData={userData}
          cartItems={cartItems}
          finalTotal={finalTotal}
          orderId={orderId}
          activeTab={activeTab}
          deliveryFee={deliveryFee}
        />
      );

      await plunkClient.emails.send({
        to: userData?.email as string,
        subject: "Your FreshBake Order Confirmation",
        body: await emailHtml,
      });

      console.log("Order confirmation email sent successfully:");
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
    }
  };

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
                      <p className="text-[14px]">{userData?.defaultAddress}</p>
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
                <p className="">
                  {userData?.firstname} {userData?.lastname}
                </p>
                <p>+{userData?.phone}</p>
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

      <div
        onClick={() =>
          handleFlutterPayment({
            callback: async (response) => {
              if (response.status === "successful") {
                try {
                  const { error } = await supabase.from("orders").insert([
                    {
                      userId: userData?.userId,
                      items: cartItems,
                      totalCost: finalTotal,
                      paymentStatus: response.status,
                      transactionId: response.transaction_id,
                      deliveryOption: activeTab,
                      deliveryFee: deliveryFee,
                      orderStatus: "Processing",
                      deliveryAddress: userData?.defaultAddress
                    },
                  ]);
                  
                  if (error) {
                    console.error("Error adding order to Supabase:", error);
                  } else {
                    setLoading(false)
                    console.log("Order added successfully:");
                    await sendOrderConfirmationEmail(
                      userData,
                      cartItems,
                      finalTotal,
                      response.transaction_id,
                      activeTab,
                      deliveryFee
                    );
                  }

                  const dbPromise = idb.open("freshbake", 1);
                  dbPromise.onsuccess = () => {
                    const db = dbPromise.result;
                    const tx = db.transaction("cart", "readwrite");
                    const cart = tx.objectStore("cart");
                    cart.clear();
                    tx.oncomplete = () => {
                      db.close();
                    };
                  };


                  navigate("/success", { state: { response } });
                } catch (err) {
                  console.error("Error processing order:", err);
                }
              }

              closePaymentModal();
            },
            onClose: () => {},
          })
        }
        className="fixed px-4 bottom-2 lg:w-[450px] w-[100%] z-50 space-y-6"
      >
        <Button
          filled={true}
          content={loading ? <Spinner /> : `Place Order ($${finalTotal})`}
          className="text-[18px]"
        />
      </div>
    </MainContainer>
  );
};

export default Checkout;
