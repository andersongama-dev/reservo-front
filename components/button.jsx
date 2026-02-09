"use client";
import React from "react";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = `
    relative overflow-hidden
    w-full px-6 py-4 rounded-lg
    font-semibold transition-all duration-200
    active:scale-95 mt-[32px]
  `;

  const variants = {
    primary: "bg-[#0000d5] text-white hover:bg-[#0000a5]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    alert: "bg-yellow-500 text-black hover:bg-yellow-600",
    edit: "bg-indigo-600 text-white hover:bg-indigo-700",
  };

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  function createRipple(e) {
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

  function handleClick(e) {
    if (disabled) return;

    createRipple(e);

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variants[variant]
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
