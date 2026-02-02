"use client";
import { useState } from "react";

type InputProps = {
  inputType: React.HTMLInputTypeAttribute;
  inputPlaceholder: string;
};

export default function Input({ inputType, inputPlaceholder }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = inputType === "password";
  const type = isPassword && showPassword ? "text" : inputType;

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={inputPlaceholder}
        className="
          w-full
          px-6 py-4
          rounded-lg
          border-none
          bg-[#e8e8e8]
          text-[#757575]
          text-base
          tracking-[2%]
          leading-relaxed
          focus:outline-none
          focus:ring-2
          focus:ring-[#0000d5]
          focus:text-[#0000d5]
          placeholder:text-[#757575]
          focus:placeholder:text-[#0000d5]
        "
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-sm
            text-[#757575]
            hover:text-[#0000d5]
          "
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      )}
    </div>
  );
}
