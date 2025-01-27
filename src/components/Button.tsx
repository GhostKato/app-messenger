'use client';
import React from "react";

type ButtonProps = {
  variant?: "standard" | "close" | "back" | "logout" | "sendMessage";
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
    "flex justify-center items-center rounded-full hover:bg-interaction shadow-custom-inset focus:bg-interaction transition duration-300 ease-in-out";

  const variantStyles = {
    standard: "w-[100px] h-8 text-sm rounded md:w-40 md:h-12 md:text-base xl:w-60 xl:h-16 xl:text-lg",
    close: "absolute top-1 right-1 rounded-full w-8 h-8 md:w-9 md:h-9 xl:w-9  xl:h-9 ",
    back: "absolute top-1 right-1 md:top-5 md:right-5 rounded-full w-[50px] h-[50px] md:w-[55px]  md:h-[55px]  xl:w-[60px]  xl:h-[60px] group", 
    logout: "rounded-full w-[45px] h-[45px] md:w-[55px] md:h-[55px]  xl:w-[60px]  xl:h-[60px] group",
    sendMessage: "rounded-full w-[70px] h-[100px] xl:w-[100px]  xl:h-[100px] group border-2 border: border-interaction",
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
