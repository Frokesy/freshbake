import { FC, useState } from "react";
import { handleLogout } from "../../../utils/logoutService.ts";
import ModalContainer from "../containers/ModalContainer.tsx";
import Spinner from "../defaults/Spinner.tsx";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal: FC<ModalProps> = ({ setIsOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  return (
    <ModalContainer>
      <div className="lg:w-[20vw] w-[80vw]">
        <h2 className="">Are you sure you want to logout?</h2>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1 bg-[#ccc] text-[#333] h-[40px] w-[85px] text-[14px] font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout(setLoading, navigate);
            }}
            className="px-4 py-1 bg-[#ff0406] text-[#fff] h-[40px] w-[85px] font-semibold rounded-md ml-4 text-[14px]"
          >
            {loading ? <Spinner /> : "Logout"}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LogoutModal;
