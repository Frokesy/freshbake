import { FC } from "react";
import Button from "../../defaults/Button";
import { WelcomeScreenProps } from "./WelcomeScreenTwo";

const WelcomeScreenThree: FC<WelcomeScreenProps> = ({ setActivePage }) => {
  const handlePageSwitch = (screen: string) => setActivePage(screen);

  return (
    <div>
      <img
        src="/assets/welcome_img_two.png"
        alt="img"
        className="w-[100%] object-cover h-[320px] max-h-[320px]"
      />
      <h2 className="text-[38px] font-semibold text-center mt-2">
        Start Your <br /> Fresh Experience
      </h2>
      <p className="text-center px-4">
        Create an account or sign in to start preordering your favorite breads.
        Freshness is just a tap away!
      </p>

      <div className="px-4 mt-6 space-y-6">
        <Button
          filled={true}
          content="Login"
          onClick={() => handlePageSwitch("login")}
          className="text-[18px]"
        />
        <Button
          filled={false}
          content="Create an account"
          onClick={() => handlePageSwitch("signup")}
          className="text-[18px]"
        />
      </div>
    </div>
  );
};

export default WelcomeScreenThree;
