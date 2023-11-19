import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string; // Allow passing additional class names
  // Add other props as needed
  onClick?: () => void;
  disabled?: boolean 
  type?: "submit" | "button" | "reset" | undefined
}

export const ButtonSmall: React.FC<Props> = ({
  children,
  className = "",
  onClick,
  type = "submit",
  ...rest
}) => {
  return (
    <button
    type={type}
      onClick={onClick}
      className={`w-34 py-2 px-5 text-base  text-cyan-500 font-semibold rounded-md border  hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonMedium: React.FC<Props> = ({
  children,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-52 py-2 px-5 text-base  text-cyan-500 font-semibold rounded-lg border hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonBig: React.FC<Props> = ({
  children,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-80 py-3 px-4 text-base  text-cyan-500 font-semibold rounded-lg border  hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export const ButtonRound: React.FC<Props> = ({
  children,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-40 pt-1 pb-1 pr-2 text-base text-center  text-cyan-500 font-semibold rounded-2xl border  hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
ButtonSmall.defaultProps = {
  children: "Click Me",
};
ButtonMedium.defaultProps = {
  children: "Click Me",
};
ButtonBig.defaultProps = {
  children: "Click Me",
};
