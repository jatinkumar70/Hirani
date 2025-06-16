import React, { useState } from "react";

interface CitySelectButtonProps {
  textOne: string; // First button text (e.g., "Dubai")
  textTwo: string; // Second button text (e.g., "Riyadh")
  onToggle: (selected: string) => void; // Callback to handle toggle changes
}

const CitySelectButton: React.FC<CitySelectButtonProps> = ({
  textOne,
  textTwo,
  onToggle,
}) => {
  const [selected, setSelected] = useState<string>(textOne);

  const handleToggle = (newSelection: string) => {
    setSelected(newSelection);
    onToggle(newSelection); // Call the parent handler with the new selection
  };

  return (
    <div className="flex justify-center items-center w-96 lg:w-full">
      {/* Button One */}
      <button
        className={`w-76 px-[3.5rem] lg:px-12 py-2 rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg border-2 ${
          selected === textOne
            ? "border-primary-gold bg-primary-gold text-white"
            : "border-primary-gold bg-transparent text-primary-gold"
        } transition-all duration-200`}
        onClick={() => handleToggle(textOne)}>
        {textOne}
      </button>

      {/* Button Two */}
      <button
        className={`w-76 px-[3.5rem] lg:px-12 py-2 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg border-2 ${
          selected === textTwo
            ? "border-primary-gold bg-primary-gold text-white"
            : "border-primary-gold bg-transparent text-primary-gold"
        } transition-all duration-200`}
        onClick={() => handleToggle(textTwo)}>
        {textTwo}
      </button>
    </div>
  );
};

export default CitySelectButton;
