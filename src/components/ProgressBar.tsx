import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  className?:string
  text?: string
  children?:React.ReactNode
}

const ProgressBar: React.FC<ProgressBarProps> = ({children,text, percentage, className ='' }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (percentage >= 0 && percentage <= 100) {
      setProgress(percentage);
    }
  }, [percentage]);

  return (
    <div className="relative pt-1">
      <div >
        <div className="flex mb-2 items-center justify-between"> 
        <div >
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200">
           {text}
          </span>
        </div>     
         
        <div className={`text-right ${className}`} >
          <span className="text-xs font-semibold inline-block text-cyan-600">
            {progress}%
          </span>
        </div>
        </div>     
      <div>{children}</div>
      </div>
      <div className={`flex h-2 mb-4 overflow-hidden text-xs bg-cyan-200 ${className}`}>
        <div
          style={{ width: `${progress.toFixed(2)}%` }}
          className={`flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-600 ${className}`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;






