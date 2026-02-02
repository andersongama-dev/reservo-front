"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "alert"
  | "edit";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative overflow-hidden
    w-full px-6 py-4 rounded-lg
    font-medium transition-all duration-200
    active:scale-95 mt-[32px]
    cursor-pointer
  `;

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#0000d5] text-white hover:bg-[#0000a5]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    alert: "bg-yellow-500 text-black hover:bg-yellow-600",
    edit: "bg-indigo-600 text-white hover:bg-indigo-700",
  };

  const disabledStyles =
    "bg-gray-300 text-gray-500 cursor-not-allowed";

  function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.style.backgroundColor = "rgba(255,255,255,0.6)";
    circle.classList.add("button-ripple");

    const ripple = button.getElementsByClassName("button-ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  }

  return (
    <button
      disabled={disabled}
      onClick={createRipple}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variants[variant]
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
