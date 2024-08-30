import { FC } from "react";

interface ButtonProps {
  className?: string;
  filled: boolean;
  content: string | JSX.Element;
  onClick?: () => void;
  disabled?: boolean
}
const Button: FC<ButtonProps> = ({ className, filled, content, onClick, disabled}) => {
  return (
    <div
      className={`${
        filled
          ? "bg-[#7d6c3a] text-[#fff] border-none"
          : "border border-[#bdb08a] bg-[#fff] text-[#000]"
      } ${className} h-[48px] flex items-center justify-center rounded-lg font-semibold`}
      onClick={onClick}
    >
      <button disabled={disabled}>{content}</button>
    </div>
  );
};

export default Button;
