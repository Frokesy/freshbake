import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreenThree from "./WelcomeScreenThree";
import WelcomeScreenTwo from "./WelcomeScreenTwo";
import Auth from "../auth";
import OnboardingContainer from "../../containers/OnboardingContainer";

const variants = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
};

const WelcomeScreen = () => {
  const [activePage, setActivePage] = useState<string>("screenTwo");

  return (
    <OnboardingContainer>
      <AnimatePresence mode="wait">
        {activePage === "screenTwo" && (
          <motion.div
            key="screenTwo"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreenTwo setActivePage={setActivePage} />
          </motion.div>
        )}
        {activePage === "screenThree" && (
          <motion.div
            key="screenThree"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreenThree setActivePage={setActivePage} />
          </motion.div>
        )}
        {(activePage === "signup" || activePage === "login") && (
          <motion.div
            key={activePage}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <Auth activePage={activePage} />
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingContainer>
  );
};

export default WelcomeScreen;
