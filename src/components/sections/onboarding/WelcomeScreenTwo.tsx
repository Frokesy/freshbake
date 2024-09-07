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
        className="w-[100%] object-cover h-[400px] max-h-[400px]"
      />
      <h2 className="text-[38px] font-semibold text-center mt-2 leading-tight mb-2">
        Fresh Bread <br /> Just a Tap Away
      </h2>
      <p className="text-center px-4">
        Enjoy the convenience of preordering your favorite agege breads and have
        them delivered fresh to your home.
      </p>

      <div className="px-4 mt-6 space-y-6 pb-20">
        <Button
          filled={true}
          content="Next"
          onClick={() => handlePageSwitch("screenThree")}
          className="text-[18px]"
        />
        <Button
          filled={false}
          content="Skip"
          onClick={() => handlePageSwitch("login")}
          className="text-[18px]"
        />
      </div>
    </div>
  );
};

export default WelcomeScreenTwo;
