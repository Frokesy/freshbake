import { FC, ReactNode } from "react";
import PageTransition from "../defaults/PageTransition";
import BottomNav from "../defaults/BottomNav";

interface MainContainerProps {
  children: ReactNode;
  active: string;
}
const MainContainer: FC<MainContainerProps> = ({ children, active }) => {

  return (
    <div className="bg-[#fffaed] min-h-screen lg:w-[480px] mx-auto">
      <PageTransition active={active}>{children}</PageTransition>
      <BottomNav />
    </div>
  );
};

export default MainContainer;
