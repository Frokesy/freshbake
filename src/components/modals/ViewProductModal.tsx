import { FC } from "react";
import { motion } from "framer-motion";
import ModalContainer from "../containers/ModalContainer";
import { ProductItemProps } from "../sections/products/Catalog";
import { CancelIcon } from "../icons";

interface ViewedProductModalProps {
  viewedProduct: ProductItemProps | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewProductModal: FC<ViewedProductModalProps> = ({ viewedProduct, setOpenModal }) => {
  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  };

  return (
    <ModalContainer>
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

          <div className="px-4 space-y-3 text-[14px]">
            <h2 className="text-[16px] font-semibold mt-6">
              Delivery Schedule
            </h2>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="wednesday">Wednesday</label>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="saturday">Saturday</label>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="sunday">Sunday</label>
              <input type="checkbox" />
            </div>
            <hr />
          </div>

          <div className="px-4 space-y-3 pb-[10vh] text-[14px]">
            <h2 className="text-[16px] font-semibold mt-6">
              Time of Delivery/Pickup
            </h2>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="time1">09:00 am</label>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="time2">06:00 pm</label>
              <input type="checkbox" />
            </div>
            <hr />
          </div>

          <div className="px-4 fixed bottom-0 bg-[#fff] w-full flex justify-between py-2">
            <div className="w-[35%] rounded-lg flex items-center justify-center py-2 space-x-3 border border-[#bdb08a]">
              <p className="border border-[#ccc] px-2 py-0.5 rounded-full">-</p>
              <p>1</p>
              <p className="border border-[#ccc] px-2 py-0.5 rounded-full">+</p>
            </div>
            <div className="w-[60%] bg-[#7d6c3a] text-[#fff] items-center justify-center flex font-semibold rounded-xl">
              <p>Add to cart - ${viewedProduct?.price}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default ViewProductModal;
