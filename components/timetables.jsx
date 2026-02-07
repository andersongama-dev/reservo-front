export default function Timetables({ time }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="">{time}</p>
      <span className="w-6 h-0.5 bg-[#d6d6d6] block"></span>
      <span className="w-12 h-0.5 bg-[#d6d6d6] block"></span>
      <span className="w-6 h-0.5 bg-[#d6d6d6] block"></span>
    </div>
  );
}
