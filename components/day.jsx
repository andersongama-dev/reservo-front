export default function Day({ day, date }) {
  return (
    <div className="flex gap-2 flex-col items-center justify-center">
      <p className="text-xl">{day}</p>
      <p className="text-base">{date}</p>
    </div>
  );
}
