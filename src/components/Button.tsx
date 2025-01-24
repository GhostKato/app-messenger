'use client';
import React from "react";

type ButtonProps = {
  variant?: "standard" | "close" | "back";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "standard",  
  className = "",
  children,
  onClick,
  disabled = false,
}) => { 

  const baseStyles =
    "flex justify-center items-center text-white rounded transition duration-300 ease-in-out";

  const variantStyles = {
    standard: "bg-button hover:bg-hover focus:bg-hover w-20 h-8 text-sm  md:w-40  md:h-12  md:text-base xl:w-60 xl:h-16 xl:text-lg",
    close: "absolute top-1 right-1 bg-transparent rounded-full hover:bg-hover focus:bg-hover w-8 h-8 md:w-9  md:h-9  xl:w-9  xl:h-9 ",
    back: "absolute top-2 left-2 bg-button hover:bg-hover focus:bg-hover w-8 h-8 md:w-12  md:h-12  xl:w-16  xl:h-16 ", 
  }; 
   
  const computedStyles = `${baseStyles} ${variantStyles[variant]} 
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      className={computedStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
