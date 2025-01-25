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
    "flex justify-center items-center bg-transparent rounded-full text-button hover:bg-hover shadow-custom-inset focus:bg-hover transition duration-300 ease-in-out";

  const variantStyles = {
    standard: "w-[100px] h-8 text-sm rounded md:w-40 md:h-12 md:text-base xl:w-60 xl:h-16 xl:text-lg",
    close: "absolute top-1 right-1 rounded-full w-8 h-8 md:w-9  md:h-9  xl:w-9  xl:h-9 ",
    back: "absolute top-5 left-5 rounded-full bg-button w-8 h-8 md:w-12  md:h-12  xl:w-16  xl:h-16 ", 
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
