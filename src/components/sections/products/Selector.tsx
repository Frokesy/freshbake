import { FC, useState } from "react";

interface SelectorProps {
    getActiveTab: (tab: string) => void;
}

interface VarietyProps {
  id: number;
  name: string;
}

const Selector: FC<SelectorProps> = ({ getActiveTab }) => {
  const [activeSelector, changeSelector] = useState<string>("All");
  const varieties: VarietyProps[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Butter" },
    { id: 3, name: "Sardine" },
    { id: 4, name: "Coconut" },
  ];

  const switchTabs = (tab: string) => {
    changeSelector(tab)
    getActiveTab(tab)
  }
  
  return (
    <div>
      <h2 className="font-semibold">Varieties of Bread</h2>
      <div className="grid grid-cols-4 gap-2">
        {varieties.map((variety) => (
          <div
            className={`${
              activeSelector === variety.name ? "text-[#fff] font-semibold bg-[#7d6c3a]" : "bg-[#F9F3DB]"
            } text-center py-1 rounded-lg mt-2 text-[14px] transition-all duration-500 ease-in-out`}
            key={variety.id}
            onClick={() => switchTabs(variety.name)}
          >
            <h2>{variety.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selector;
