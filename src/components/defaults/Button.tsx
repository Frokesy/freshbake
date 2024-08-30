import { FC } from "react";

interface ButtonProps {
  className?: string;
  filled: boolean;
  content: string;
  onClick?: () => void;
}
const Button: FC<ButtonProps> = ({ className, filled, content, onClick }) => {
  return (
    <div
      className={`${
        filled
          ? "bg-[#7d6c3a] text-[#fff] border-none"
          : "border border-[#bdb08a] bg-[#fff] text-[#000]"
      } ${className} h-[48px] flex items-center justify-center rounded-lg font-semibold`}
      onClick={onClick}
    >
      <button>{content}</button>
    </div>
  );
};

export default Button;
