import React from "react";

interface ChevronDownProps {
  className?: string; // Make className an optional prop
  color?: string; // Make color an optional prop
}

const ChevronDown: React.FC<ChevronDownProps> = ({ className, color }): JSX.Element => {
  return (
    <div className={`relative w-[24px] h-[24px] ${className}`}>
      <img className={`absolute w-[14px] h-[8px] top-[8px] left-[5px]`} alt="Icon" src="icon.svg" style={{ color }} />
    </div>
  );
};

export default ChevronDown;
