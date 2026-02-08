export default function UpcomingService({ time, service, cliente, barber }) {
  return (
    <tr className="h-10">
      <td>{time}</td>
      <td>{service}</td>
      <td>{cliente}</td>
      <td>{barber}</td>
      <td className="flex gap-4">
        <button className="w-6 h-10 text-[#0000d5] flex items-center justify-center text-[24px]">
          <i className="bi bi-play-fill"></i>
        </button>

        <button className="w-6 h-10 text-orange-600 text-[16px] flex items-center justify-center">
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
}
