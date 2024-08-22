import { FC } from "react";

interface ButtonProps {
  className?: string;
  filled: boolean;
  content: string;
}
const Button: FC<ButtonProps> = ({ className, filled, content }) => {
  return (
    <div
      className={`${
        filled
          ? "bg-[#7d6c3a] text-[#fff] border-none"
          : "border border-[#bdb08a] bg-[#fff] text-[#000]"
      } ${className} text-center py-3 rounded-lg font-semibold`}
    >
      <button>{content}</button>
    </div>
  );
};

export default Button;
