import { useState } from "react";
import { motion } from "framer-motion";
import OnboardingContainer from "../../components/containers/OnboardingContainer";
import ForgotPassword from "../../components/sections/auth/ForgotPassword";
import OTPPage from "../../components/sections/auth/OTPPage";
import { UserDataProps } from "../home";
const ResetPassword = () => {
  const [activeScreen, setActiveScreen] = useState<string>("password-reset");
  const [user, setUser] = useState<UserDataProps>()

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <OnboardingContainer>
      {activeScreen !== "otp" ? (
        <motion.div
          key="password-reset"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <ForgotPassword setUser={setUser} setActiveScreen={setActiveScreen} />
        </motion.div>
      ) : (
        <motion.div
          key="otp"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <OTPPage user={user} />
        </motion.div>
      )}
    </OnboardingContainer>
  );
};

export default ResetPassword;
