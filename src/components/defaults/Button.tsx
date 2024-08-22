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
      } ${className} text-center py-3 rounded-lg font-semibold`}
    >
      <button onClick={onClick}>{content}</button>
    </div>
  );
};

export default Button;
