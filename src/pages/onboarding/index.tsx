import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../../components/defaults/Container";
import PageLoader from "../../components/defaults/PageLoader";
import WelcomeScreen from "../../components/sections/onboarding";

const screenVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Onboarding = () => {
  const [activePage, setActivePage] = useState<string>("pageloader");

  setTimeout(() => setActivePage("onboarding"), 3000);

  return (
    <Container>
      <div className="">
        {activePage === "pageloader" ? (
          <motion.div
            key="pageloader"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariant}
            transition={{ duration: 0.8 }}
          >
            <PageLoader />
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariant}
            transition={{ duration: 0.8 }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default Onboarding;
