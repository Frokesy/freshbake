import { motion } from "framer-motion"
import { FC } from "react";

interface ConfirmProductDeleteProps {
    getResponse: (res: string) => void;
  }
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

const ConfirmProductDeleteModal: FC<ConfirmProductDeleteProps> = ({ getResponse }) => {
  return (
<motion.div
      className="fixed top-0 h-screen w-screen z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      key={"logout"}
      exit="hidden"
    >
      <motion.div
        className="absolute top-0 left-0 h-full w-full bg-[#000] z-40"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />

      <motion.div
        className="bg-[#fff] w-[80vw] pt-6 z-50 rounded-lg shadow-xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-center font-semibold">Delete Product?</h2>
        <h2 className="text-[13px] px-3 text-center">
          Are you sure you want to delete this product??
        </h2>
        <div className="flex mt-6 border-t-2 border-[#ccc]">
          <button
            onClick={() => getResponse("no")}
            className="px-4 py-1 border-r-2 text-blue-400 border-[#ccc] w-[50%] h-[50px] text-[14px] font-semibold"
          >
            No
          </button>
          <button
            onClick={() => getResponse("yes")}
            className="px-4 py-1 w-[50%] text-green-500 h-[50px] text-[14px] font-semibold"
          >
            Yes
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmProductDeleteModal
