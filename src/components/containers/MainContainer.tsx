import { FC, ReactNode } from "react";
import PageTransition from "../defaults/PageTransition";
import BottomNav from "../defaults/BottomNav";
import TopNav from "../defaults/TopNav";

interface MainContainerProps {
  children: ReactNode;
  active: string;
}
const MainContainer: FC<MainContainerProps> = ({ children, active }) => {
  return (
    <div className="bg-[#fffaed] min-h-screen lg:w-[480px] mx-auto">
      <TopNav />
      <PageTransition active={active}>
        <div className="pt-10">{children}</div>
      </PageTransition>
      <BottomNav active={active} />
    </div>
  );
};

export default MainContainer;
