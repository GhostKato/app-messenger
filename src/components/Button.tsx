'use client';
import React from "react";

type ButtonProps = {
  variant?: "standard" | "close" | "back" | "logout";
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "standard",
  type = "button",
  className = "",
  children,
  onClick,
  disabled = false,
}) => { 

  const baseStyles =
    "flex justify-center items-center rounded-full text-button hover:bg-four shadow-custom-inset focus:bg-four transition duration-300 ease-in-out";

  const variantStyles = {
    standard: "w-[100px] h-8 text-sm rounded md:w-40 md:h-12 md:text-base xl:w-60 xl:h-16 xl:text-lg",
    close: "absolute top-1 right-1 rounded-full w-8 h-8 md:w-9  md:h-9  xl:w-9  xl:h-9 ",
    back: "absolute bottom-5 right-5 rounded-full bg-button  w-[50px] h-[50px] md:w-[55px]  md:h-[55px]  xl:w-[60px]  xl:h-[60px] group", 
    logout: "rounded-full bg-button w-[50px] h-[50px] md:w-[55px]  md:h-[55px]  xl:w-[60px]  xl:h-[60px] group",
  }; 
   
  const computedStyles = `${baseStyles} ${variantStyles[variant]} 
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      type={type}
      className={computedStyles}
      onClick={onClick}
      disabled={disabled}      
    >
      {children}
    </button>
  );
};

export default Button;
