import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out";

  const variantStyles = {
    primary: "bg-primary text-white hover:brightness-110 focus:ring-primary",
    secondary: "bg-secondary text-white hover:brightness-110 focus:ring-secondary",
    danger: "bg-danger text-white hover:brightness-110 focus:ring-danger",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const computedStyles = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
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