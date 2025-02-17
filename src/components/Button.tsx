'use client';
import React from "react";

type ButtonProps = {
  variant?: "standard" | "close" | "back" | "logout" | "messageSendForm" | "messageUpdateForm" |"updateMessage" | "menuMessage";
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
    "flex justify-center items-center hover:bg-interaction shadow-custom-inset focus:bg-interaction transition duration-300 ease-in-out";

  const variantStyles = {
    standard: "w-[100px] h-8 md:w-40 text-sm rounded-full md:h-12 md:text-base xl:text-lg",
    close: "absolute top-1 right-1 rounded-full w-8 h-8 md:w-9 md:h-9 xl:w-9  xl:h-9 ",
    back: "absolute top-1 right-1 md:top-5 md:right-5 rounded-full w-[50px] h-[50px] md:w-[55px]  md:h-[55px]  xl:w-[60px]  xl:h-[60px] group", 
    logout: "rounded-full w-[45px] h-[45px] md:w-[55px] md:h-[55px]  xl:w-[60px]  xl:h-[60px] group",
    messageSendForm: "rounded-[20px] w-[70px] h-[85px] xl:w-[92px] xl:h-[92px] group border-2 border: border-interaction",
    messageUpdateForm: "rounded-[20px] w-[70px] h-[85px] xl:w-[92px] xl:h-[92px] bg-black group border-2 border: border-interaction",
    updateMessage: "absolute top-1 right-1 rounded-full w-8 h-8 md:w-10 md:h-10 xl:w-12  xl:h-12 group hover:bg-transparent focus:bg-transparent shadow-none",
    menuMessage: "bg-black rounded-[12px] w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 group hover:bg-interaction focus:bg-interaction border-2 border: border-interaction",
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
