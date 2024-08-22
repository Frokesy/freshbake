import { FC } from "react";
import Button from "../../defaults/Button";

export interface WelcomeScreenProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const WelcomeScreenTwo: FC<WelcomeScreenProps> = ({ setActivePage }) => {
  const handlePageSwitch = (screen: string) => setActivePage(screen);
  return (
    <div>
      <img
        src="/assets/welcome_img_one.png"
        alt="img"
        className="w-[100%] object-cover h-[300px] max-h-[320px]"
      />
      <h2 className="text-[38px] font-semibold text-center mt-2">
        Fresh Bread <br /> Just a Tap Away
      </h2>
      <p className="text-center px-6">
        Enjoy the convenience of preordering your favorite agege breads and have
        them delivered fresh to your home.
      </p>

      <div className="px-6 mt-6 space-y-6">
        <Button
          filled={true}
          content="Next"
          onClick={() => handlePageSwitch("screenThree")}
          className="text-[18px]"
        />
        <Button
          filled={false}
          content="Skip"
          onClick={() => handlePageSwitch("signup")}
          className="text-[18px]"
        />
      </div>
    </div>
  );
};

export default WelcomeScreenTwo;
