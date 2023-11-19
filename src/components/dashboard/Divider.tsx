import React from 'react';

interface DividerProps {
  darkmode: boolean;
  className?: string; // Allow className as a prop
}

const Divider: React.FC<DividerProps> = ({ darkmode, className, ...rest }) => {
  // Define CSS classes based on the darkmode prop
  const dividerClasses = ` ${darkmode ? 'border-gray-700' : 'border-gray-300'} ${className || ''}`;

  return <hr className={dividerClasses} {...rest} />;
};

export default Divider;


