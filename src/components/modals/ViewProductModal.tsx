import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalContainer from "../containers/ModalContainer";
import { ProductItemProps } from "../sections/products/Catalog";
import { CancelIcon } from "../icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../defaults/Spinner";

interface ViewedProductModalProps {
  viewedProduct: ProductItemProps | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewProductModal: FC<ViewedProductModalProps> = ({
  viewedProduct,
  setOpenModal,
}) => {
  const [deliveryDay, setDeliveryDay] = useState<string | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalCost, setTotalCost] = useState<number>(
    parseFloat(viewedProduct?.price as string)
  );

  const idb = window.indexedDB;

  const handleDayChange = (day: string) => {
    setDeliveryDay(day);
    setDeliveryTime(null);
  };

  const handleTimeChange = (time: string) => {
    setDeliveryTime(time);
  };

  const handleClick = (cmd: string) => {
    if (cmd === "increment") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity <= 0 ? 0 : quantity - 1);
    }
  };

  useEffect(() => {
    setTotalCost(parseFloat(viewedProduct?.price as string) * quantity);
  }, [quantity, viewedProduct]);

  const handleAddToCart = () => {
    setLoading(true);
    if (!deliveryDay || !deliveryTime) {
      toast.error(
        "Please select a delivery day and time before adding to the cart.",
        {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
        }
      );
      setLoading(false);
      return;
    }
    if (viewedProduct?.tag !== "Agege") {
      if (quantity < 2) {
        toast.error("Minimum of 2 items must be ordered", {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
        });
        setLoading(false);
        return;
      }
    } else {
      if (quantity === 0) {
        toast.error("Minimum of 1 item must be ordered", {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
        });
        setLoading(false);
        return;
      }
    }
    const orderDetails = {
      id: viewedProduct?.id,
      type: viewedProduct?.type,
      category: viewedProduct?.category,
      tag: viewedProduct?.tag,
      img: viewedProduct?.img,
      weight: viewedProduct?.weight,
      desc: viewedProduct?.desc,
      price: viewedProduct?.price,
      deliveryDay,
      deliveryTime,
      quantity,
      totalCost,
    };
    const dbPromise = idb.open("freshbake", 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("cart", "readwrite");
      const carts = tx.objectStore("cart");
      const addData = carts.put(orderDetails);

      addData.onsuccess = () => {
        tx.oncomplete = () => {
          setLoading(false);
          toast.success("Added to Cart!", {
            position: "top-right",
            theme: "light",
            autoClose: 500,
            hideProgressBar: true,
            draggable: true,
          });
          setTimeout(() => {
            setOpenModal(false);
          }, 1000);
          db.close();
        };
      };
    };
  };

  const availableTimes = () => {
    switch (deliveryDay) {
      case "Saturday":
        return ["09:00 am", "06:00 pm"];
      case "Wednesday":
      case "Sunday":
        return ["06:00 pm"];
      default:
        return [];
    }
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  return (
    <ModalContainer>
      <ToastContainer />
      <motion.div
        className="bg-[#fff] w-full h-full rounded-t-[50px] flex flex-col"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div className="relative">
          <img
            src={viewedProduct?.img}
            alt="img"
            className="w-full h-[250px] object-cover rounded-t-[50px]"
          />
          <div
            onClick={() => setOpenModal(false)}
            className="p-3 bg-[#fff] rounded-full absolute top-10 right-6"
          >
            <CancelIcon />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-3">
            <div className="flex justify-between mt-2 items-center">
              <div>
                <h2 className="font-semibold">{viewedProduct?.category}</h2>
                <p className="text-[14px] italic pt-3">{viewedProduct?.type}</p>
              </div>
              <p className="font-semibold text-[16px]">
                ${viewedProduct?.price}
              </p>
            </div>
            <p className="text-[14px] text-[#808080] italic">
              {viewedProduct?.desc}
            </p>
            <hr />
          </div>

          {viewedProduct?.tag !== "Agege" && (
            <div className="">
              <div className="flex justify-between px-4 py-4 items-center">
                <div className="">
                  <h2 className="font-semibold">Order Quantity</h2>
                  <p className="text-[14px]">Minimum of 2</p>
                </div>
                <h3 className="text-[12px] border border-[#ff0000] py-1 px-2 rounded-md text-[#ff0000]">
                  Required
                </h3>
              </div>
              <hr />
            </div>
          )}
          <div className="px-4 space-y-3 text-[14px]">
            <h2 className="text-[16px] font-semibold mt-6">
              Delivery Schedule
            </h2>
            {["Wednesday", "Saturday", "Sunday"].map((day) => (
              <div className="flex justify-between items-center mt-4" key={day}>
                <label htmlFor={day}>{day}</label>
                <input
                  type="checkbox"
                  checked={deliveryDay === day}
                  onChange={() => handleDayChange(day)}
                />
              </div>
            ))}
            <hr />
          </div>

          <div className="px-4 space-y-3 pb-[20vh] text-[14px]">
            <h2 className="text-[16px] font-semibold mt-6">
              Time of Delivery/Pickup
            </h2>
            {availableTimes().map((time) => (
              <div
                className="flex justify-between items-center mt-4"
                key={time}
              >
                <label htmlFor={time}>{time}</label>
                <input
                  type="checkbox"
                  checked={deliveryTime === time}
                  onChange={() => handleTimeChange(time)}
                />
              </div>
            ))}
            <hr />
          </div>

          <div className="px-4 fixed bottom-0 pb-6 bg-[#fff] w-full flex justify-between py-2">
            <div className="w-[35%] rounded-lg flex items-center justify-center py-2 space-x-3 border border-[#bdb08a]">
              <p
                onClick={() => handleClick("decrement")}
                className="border border-[#ccc] px-2 py-0.5 rounded-full"
              >
                -
              </p>
              <p>{quantity}</p>
              <p
                onClick={() => handleClick("increment")}
                className="border border-[#ccc] px-2 py-0.5 rounded-full"
              >
                +
              </p>
            </div>
            <div
              onClick={handleAddToCart}
              className="w-[60%] bg-[#7d6c3a] text-[#fff] items-center justify-center flex font-semibold rounded-xl cursor-pointer"
            >
              {loading ? <Spinner /> : <p>Add to cart - ${totalCost}</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default ViewProductModal;
