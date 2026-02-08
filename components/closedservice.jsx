export default function ClosedService({ time, service, cliente, barber }) {
  return (
    <tr>
      <td>{time}</td>
      <td>{service}</td>
      <td>{cliente}</td>
      <td>{barber}</td>
      <td className="flex gap-4 text-[32px]">
        <button className="w-6 h-6 text-green-600">
          <i className="bi bi-check"></i>
        </button>
      </td>
    </tr>
  );
}
