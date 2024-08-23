import React, { FC } from "react";

interface FormProps {
  label: string;
  type: string;
}
const Input: FC<FormProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  type,
  ...props
}) => {
  return (
    <div>
      <div className="flex flex-col text-[#333] mt-8">
        <label
          htmlFor={label}
          className={`font-semibold mb-1`}
        >
          {label}
        </label>
        <input
          type={type}
          required
          className={`border border-[#ccc] bg-inherit py-2 hover:shadow-xl transition-all duration-500 ease-in-out rounded-md shadow-md outline-none px-3`}
          {...props}
        />
      </div>

     
    </div>
  );
};

export default Input;
