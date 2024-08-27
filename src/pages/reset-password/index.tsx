import { useState } from "react";
import { motion } from "framer-motion";
import OnboardingContainer from "../../components/containers/OnboardingContainer";
import ForgotPassword from "../../components/sections/auth/ForgotPassword";
import OTPPage from "../../components/sections/auth/OTPPage";
const ResetPassword = () => {
  const [activeScreen, setActiveScreen] = useState<string>("password-reset");

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
          <ForgotPassword setActiveScreen={setActiveScreen} />
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
          <OTPPage />
        </motion.div>
      )}
    </OnboardingContainer>
  );
};

export default ResetPassword;
