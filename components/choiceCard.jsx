"use client";

export default function ChoiceCard({ label, value, selected, onSelect }) {
  return (
    <label className="relative block cursor-pointer w-[30dvw]">
      <input
        type="radio"
        name="onboarding-choice"
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="hidden"
      />

      <div
        className={`
          relative overflow-hidden rounded-xl px-6 py-5
          transition-all duration-300 ease-out
          ${
            selected
              ? "bg-[#0000D5]/55 text-white scale-[1.02]"
              : "bg-[#e8e8e8] text-[#757575] hover:bg-[#dcdcdc]"
          }
        `}
      >
        <span className="text-lg font-medium">{label}</span>

        {selected && <Particles />}
      </div>
    </label>
  );
}

function Particles() {
  return (
    <span className="pointer-events-none absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <span key={i} className={`particle particle-${i}`} />
      ))}
    </span>
  );
}
