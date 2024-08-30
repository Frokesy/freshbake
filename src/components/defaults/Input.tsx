import React, { FC } from "react";
import { motion } from "framer-motion";

interface FormProps {
  label: string;
  type: string;
  fnErr?: string;
  lnErr?: string;
  emailErr?: string;
  phoneErr?: string;
  pwdErr?: string;
}

const Input: FC<FormProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  type,
  fnErr,
  lnErr,
  emailErr,
  phoneErr,
  pwdErr,
  ...props
}) => {
  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="flex flex-col text-[#333]">
        <label htmlFor={label} className={`font-semibold mb-1`}>
          {label}
        </label>
        <input
          type={type}
          required
          className={`
            ${fnErr && "border border-red-500 text-red-500"}
            ${lnErr && "border border-red-500 text-red-500"}
            ${emailErr && "border border-red-500 text-red-500"}
            ${phoneErr && "border border-red-500 text-red-500"}
            ${pwdErr && "border border-red-500 text-red-500"}
            border border-[#ccc] bg-inherit py-2 hover:shadow-xl transition-all duration-500 ease-in-out rounded-md shadow-md outline-none px-3`}
          {...props}
        />
      </div>

      {fnErr ? (
        <motion.small
          className="text-red-500 text-[12px] mt-1 flex justify-start"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariants}
          transition={{ duration: 0.3 }}
        >
          {fnErr}
        </motion.small>
      ) : null}
      {lnErr ? (
        <motion.small
          className="text-red-500 text-[12px] mt-1 flex justify-start"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariants}
          transition={{ duration: 0.3 }}
        >
          {lnErr}
        </motion.small>
      ) : null}
      {emailErr ? (
        <motion.small
          className="text-red-500 text-[12px] mt-1 flex justify-start"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariants}
          transition={{ duration: 0.3 }}
        >
          {emailErr}
        </motion.small>
      ) : null}
      {phoneErr ? (
        <motion.small
          className="text-red-500 text-[12px] mt-1 flex justify-start"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariants}
          transition={{ duration: 0.3 }}
        >
          {phoneErr}
        </motion.small>
      ) : null}
      {pwdErr ? (
        <motion.small
          className="text-red-500 text-[12px] mt-1 flex justify-start"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariants}
          transition={{ duration: 0.3 }}
        >
          {pwdErr}
        </motion.small>
      ) : null}
    </div>
  );
};

export default Input;