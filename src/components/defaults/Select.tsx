import { useState } from "react";
import { ArrowDown } from "../icons";

const Select = () => {
  const [option, setOption] = useState<string>("Select");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const options = [
    { value: "Processing", label: "Processing" },
    { value: "Out for Delivery", label: "Out for Delivery" },
    { value: "Delivered", label: "Delivered" },
  ];

  const handleChange = (item: string) => {
    setOption(item)
    setOpenOptions(false)
  } 
  return (
    <div className="flex flex-col relative">
      {openOptions && (
        <div className="bg-[#fff] flex flex-col absolute top-10 left-10 space-y-4 pr-10 pl-3 py-3 shadow-lg">
          {options.map((item, index) => (
            <div className="flex" key={index}>
              <p className="" onClick={() => handleChange(item.value)}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}
      <div onClick={() => setOpenOptions(!openOptions)} className="flex">
        <div className="bg-[#fff] py-2 px-3 flex items-center space-x-10 rounded-lg shadow-lg">
          <h2 className="">{option}</h2>
          <div className="scale-75">
            <ArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
