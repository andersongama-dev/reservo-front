export default function Scheduling({ cliente, service, row, column }) {
  return (
    <div className="bg-[#d6d6f8] flex flex-col h-19.5">
      <span className="h-1.5 rounded-t w-full bg-[#0000d5] block"></span>
      <div className="w-full flex flex-col mt-2 gap-2 px-4">
        <h5 className="text-base text-[#0000d5] font-semibold ">{cliente}</h5>
        <p className="text-[13px]">{service}</p>
      </div>
    </div>
  );
}
