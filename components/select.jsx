"use client";
export default function Select({
  value,
  onChange,
  disabled = false,
  children,
}) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          appearance-none w-full px-6 py-4 rounded-lg border-none
          bg-[#e8e8e8] text-[#757575]
          focus:ring-2 focus:ring-[#0000d5]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {children}
      </select>

      <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#757575]" />
    </div>
  );
}
