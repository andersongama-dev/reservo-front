"use client";

export default function Bar({ value = 0 }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className="w-full overflow-hidden rounded-full"
      style={{
        height: "8px",
        backgroundColor: "#D6D6D6",
      }}
    >
      <div
        style={{
          width: `${safeValue}%`,
          height: "100%",
          backgroundColor: "#0000D5",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}
