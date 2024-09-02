import { FC, useState } from "react";
import { motion } from "framer-motion";
import Spinner from "../defaults/Spinner.tsx";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../utils/logoutService.tsx";

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal: FC<ModalProps> = ({ setIsOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  return (
    <motion.div
      className="absolute top-0 h-screen w-screen z-50 flex items-center justify-center"
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
        <h2 className="text-center font-semibold">Log out</h2>
        <h2 className="text-[14px] text-center">Are you sure you want to logout?</h2>
        <div className="flex mt-6 border-t-2 border-[#ccc]">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1 border-r-2 text-blue-400 border-[#ccc] w-[50%] h-[50px] text-[14px] font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout(setLoading, navigate);
            }}
            className="px-4 py-1 w-[50%] text-[#333] h-[50px] text-[14px] font-semibold"
          >
            {loading ? <Spinner color={"#000"} /> : "Yes"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogoutModal;
