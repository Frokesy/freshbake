import { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import { CartItemProps } from "..";
import { UserDataProps } from "../../home";
import { pb } from "../../../../utils/pocketbaseClient";
import PreCheckout from "../../../components/sections/checkout/PreCheckout";

export interface VendorDetailsProps {
  vendorName: string;
  pickupAddress: string;
  phoneNumber: string;
}

export interface CheckoutDataProps {
  cartItems: CartItemProps[];
  transactionId: number;
  totalCost: number;
  userData: UserDataProps | undefined;
  deliveryOption: string;
  deliveryFee: number;
  deliveryAddress: string | undefined;
}

const Checkout = () => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [vendorDetails, setVendorDetails] = useState<VendorDetailsProps>();
  const [checkoutData, setCheckoutData] = useState<CheckoutDataProps>();
  const [activeScreen, setActiveScreen] = useState<string>("prechekout");

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
    const getUser = async () => {
      try {
        const user = pb.authStore.model;
        if (!user) return;

        const data = await pb.collection("users").getOne(user.id);
        setUserData(data as unknown as UserDataProps);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const data = await pb.collection("admin").getFullList();
        setVendorDetails(data as unknown as VendorDetailsProps);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    fetchVendorDetails();
  }, []);

  useEffect(() => {
    getCartItems();
  });

  return (
    <MainContainer active="Cart">
      <PreCheckout
        cartItems={cartItems}
        userData={userData}
        vendorDetails={vendorDetails}
        setCheckoutData={setCheckoutData}
        setActiveScreen={setActiveScreen}
      />
    </MainContainer>
  );
};

export default Checkout;
