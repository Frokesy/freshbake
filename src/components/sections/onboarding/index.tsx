import { useState } from "react";
import Container from "../../defaults/Container";
import WelcomeScreenThree from "./WelcomeScreenThree";
import WelcomeScreenTwo from "./WelcomeScreenTwo";
import Auth from "../auth";

const WelcomeScreen = () => {
  const [activePage, setActivePage] = useState<string>("screenTwo");

  return (
    <Container>
      {activePage === "screenTwo" && (
        <WelcomeScreenTwo setActivePage={setActivePage} />
      )}
      {activePage === "screenThree" && (
        <WelcomeScreenThree setActivePage={setActivePage} />
      )}
      {activePage === "signup" && <Auth activePage={activePage} />}
      {activePage === "login" && <Auth activePage={activePage} />}
    </Container>
  );
};

export default WelcomeScreen;
