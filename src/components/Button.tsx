'use client';
import React from "react";
import { useScreenSizeContext } from "../contexts/screenSizeContext";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";  
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",  
  className = "",
  children,
  onClick,
  disabled = false,
}) => {

  const { screenSize } = useScreenSizeContext();

  const baseStyles =
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out";

  const variantStyles = {
    primary: "bg-primary text-white hover:brightness-110 focus:ring-primary",
    secondary: "bg-secondary text-white hover:brightness-110 focus:ring-secondary",
    danger: "bg-danger text-white hover:brightness-110 focus:ring-danger",
  };

  const sizeStyles = {
    mobil: "px-3 py-1 text-sm",
    table: "px-6 py-4 text-base",
    desk: "px-12 py-8 text-lg",
  };

  const computedStyles = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[screenSize]
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