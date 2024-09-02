import { FC } from "react";
interface SpinnerProps {
  color?: string
}
const Spinner:FC<SpinnerProps> = ({ color }) => {
    return (
      <div className="flex justify-center items-center h-[100%]">
        <div className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 ${color === "#000" ? "border-[#000]" : "border-[#fff]"}`}></div>
      </div>
    );
  };
  
  export default Spinner;
  