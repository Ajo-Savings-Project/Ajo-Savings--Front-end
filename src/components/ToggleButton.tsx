// ToggleButton.tsx
import React, { useState } from 'react';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';

type ToggleButtonProps = {
  label: string;
  onToggle: () => void;
  checked? : boolean
};

const ToggleButton: React.FC<ToggleButtonProps> = ({checked =false, label, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    // setIsChecked(!isChecked);
    onToggle();
    checked
  };

  return (
    <div className="flex items-center">
      <div onClick={handleToggle }>
        <div style={{ cursor: 'pointer', fontSize: '30px', color: checked ? 'green' : 'gray' }}>
          {checked ? <BsToggle2On /> : <BsToggle2Off />}
        </div>
      </div>
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default ToggleButton;
