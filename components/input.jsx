"use client";
import { useState } from "react";

export default function Input({
  inputType,
  inputPlaceholder,
  value,
  onChange,
  disabled = false,
}) {
  const isPassword = inputType === "password";
  const [showPassword, setShowPassword] = useState(false);
  const type = isPassword && showPassword ? "text" : inputType;

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-6 py-4 rounded-lg border-none
          bg-[#e8e8e8] text-[#757575]
          focus:ring-2 focus:ring-[#0000d5]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />

      {isPassword && !disabled && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-[#757575] hover:text-[#0000d5]
          "
        >
          <i
            className={`${
              showPassword ? "bi bi-eye-slash" : "bi bi-eye"
            } text-[24px]`}
          />
        </button>
      )}
    </div>
  );
}
