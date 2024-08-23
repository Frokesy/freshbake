import { FC, useState } from "react";
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
  const [activeScreen, setActiveScreen] = useState<string>(activePage);
 
  return (
    <AnimatePresence mode="wait">
      {activeScreen === "signup" ? (
        <motion.div
          key="signup"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Signup setActiveScreen={setActiveScreen} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Login setActiveScreen={setActiveScreen} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Auth;
