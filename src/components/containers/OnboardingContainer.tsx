import React, { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}
const OnboardingContainer: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="">
      <div className="bg-[#fffaed] min-h-screen lg:w-[450px] mx-auto">{children}</div>
    </div>
  );
};

export default OnboardingContainer;
