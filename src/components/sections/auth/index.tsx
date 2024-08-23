import { FC } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { motion, AnimatePresence } from "framer-motion";

interface AuthProps {
  activePage: string;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Auth: FC<AuthProps> = ({ activePage }) => {
  return (
    <AnimatePresence mode="wait">
      {activePage === "signup" ? (
        <motion.div
          key="signup"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <Signup />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <Login />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Auth;
