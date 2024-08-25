import { FC } from "react";

interface ModalContainerProps {
    children: React.ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 h-[95%] z-30 w-[100%] left-0">
      {children}
    </div>
  )
}

export default ModalContainer
