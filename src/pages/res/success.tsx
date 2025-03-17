import { NavLink, useLocation } from "react-router-dom";
import Button from "../../components/defaults/Button";
import { useEffect, useState, useRef } from "react";
import { UserDataProps } from "../home";
import { CartItemProps } from "../cart";
import { render } from "@react-email/render";
import { PaymentSuccessful } from "../../components/email-templates/PaymentSuccessful";
import Plunk from "@plunk/node";
import Spinner from "../../components/defaults/Spinner";
import { pb } from "../../../utils/pocketbaseClient";

const Success = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [loading, setLoading] = useState<boolean>(true);
  const plunkSecret = import.meta.env.VITE_PLUNK_SECRET;
  const plunkClient = new Plunk(plunkSecret);
  const hasRun = useRef(false);

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

      console.log("Order confirmation email sent successfully.");
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
    }
  };

  const clearCart = () => {
    return new Promise<void>((resolve, reject) => {
      const dbRequest = window.indexedDB.open("freshbake", 1);

      dbRequest.onerror = () => {
        console.error("Failed to open IndexedDB.");
        reject(dbRequest.error);
      };

      dbRequest.onsuccess = () => {
        const db = dbRequest.result;
        const tx = db.transaction("cart", "readwrite");
        const store = tx.objectStore("cart");

        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
          tx.oncomplete = () => {
            db.close();
            console.log("Cart cleared from IndexedDB.");
            resolve();
          };
        };

        clearRequest.onerror = () => {
          console.error("Failed to clear cart from IndexedDB.");
          reject(clearRequest.error);
        };
      };
    });
  };

  const addNotificationToPocketBase = async () => {
    try {
      const notificationData = {
        userId: data.userData.id,
        title: "Order Placed",
        message: `Your order #${data.transactionId} has been placed successfully.`,
        timestamp: new Date().toISOString(),
        read: false,
      };
  
      await pb.collection("notifications").create(notificationData);
  
      console.log("Notification added to PocketBase.");
    } catch (err) {
      console.error("Error adding notification:", err);
    }
  };
  
  const addOrderToDB = async () => {
    try {
      const orderData = {
        userId: data.userData.id,
        items: JSON.stringify(data.cartItems),
        totalCost: data.totalCost,
        paymentStatus: "successful",
        transactionId: data.transactionId,
        deliveryOption: data.deliveryOption,
        deliveryFee: data.deliveryFee,
        orderStatus: "Processing",
        deliveryAddress: data.deliveryAddress,
      };
  
      await pb.collection("orders").create(orderData);
  
      console.log("Order added successfully to PocketBase.");
  
      setLoading(false);
  
      await sendOrderConfirmationEmail(
        data.userData,
        data.cartItems,
        data.totalCost,
        data.transactionId,
        data.activeTab,
        data.deliveryFee
      );
  
      await clearCart();
      await addNotificationToPocketBase();
    } catch (err) {
      console.error("Error processing order:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      addOrderToDB();
    }
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100%] mx-auto flex flex-col items-center justify-center">
        <Spinner color="#000" />
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-[100%] mx-auto flex flex-col items-center justify-center">
      <div className="h-[246px] w-[246px]">
        <img
          src="/assets/success.png"
          alt="Success"
          className="w-[100%] h-[100%]"
        />
      </div>

      <h2 className="text-[24px] font-semibold">Order Placed!!</h2>
      <p className="text-[14px] text-[#404040]">
        Your order #{data.transactionId} is successfully placed
      </p>
      <div className="px-4 mt-6 space-y-6 pt-10 pb-20 w-[100%]">
        <NavLink to={`/orders/track-order/${data.transactionId}`}>
          <Button filled={true} content="Track Order" className="text-[18px]" />
        </NavLink>
        <div>
          <NavLink to="/home">
            <Button filled={false} content="Back Home" className="text-[18px]" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Success;
