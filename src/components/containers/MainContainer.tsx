import { FC, ReactNode } from "react";
import PageTransition from "../defaults/PageTransition";

interface MainContainerProps {
  children: ReactNode;
  active?: string;
}
const MainContainer: FC<MainContainerProps> = ({ children, active }) => {

    console.log(active)
  return (
    <div className="bg-[#fffaed] min-h-screen lg:w-[480px] mx-auto">
      <PageTransition>{children}</PageTransition>
    </div>
  );
};

export default MainContainer;
