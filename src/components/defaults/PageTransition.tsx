import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}
const PageTransition: FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
        {children}
    </motion.div>
  );
};

export default PageTransition;
