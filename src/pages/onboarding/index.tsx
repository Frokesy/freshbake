import { useState } from "react";
import Container from "../../components/defaults/Container";
import PageLoader from "../../components/defaults/PageLoader";
import WelcomeScreen from "../../components/sections/onboarding";

const Onboarding = () => {
  const [activePage, setActivePage] = useState<String>("pageloader");

  setTimeout(() => setActivePage("onboarding"), 3000);

  return (
    <Container>
      <div className="">
        {activePage === "pageloader" ? <PageLoader /> : <WelcomeScreen />}
      </div>
    </Container>
  );
};

export default Onboarding;
