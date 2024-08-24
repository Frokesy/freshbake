import { FC, ReactNode } from "react";
import PageTransition from "../defaults/PageTransition";
import BottomNav from "../defaults/BottomNav";

interface MainContainerProps {
  children: ReactNode;
  active: string;
}
const MainContainer: FC<MainContainerProps> = ({ children, active }) => {
  return (
    <div className="min-h-screen lg:w-[450px] mx-auto">
      <PageTransition active={active}>
        <div>{children}</div>
      </PageTransition>
      <BottomNav active={active} />
    </div>
  );
};

export default MainContainer;
