export default function InService({ time, service, cliente, barber }) {
  return (
    <tr>
      <td>{time}</td>
      <td>{service}</td>
      <td>{cliente}</td>
      <td>{barber}</td>
      <td className="text-[32px] flex gap-4">
        <button className="w-6 h-6 text-green-600">
          <i className="bi bi-check"></i>
        </button>
        <button className="w-6 h-6 text-red-600">
          <i className="bi bi-x"></i>
        </button>
      </td>
    </tr>
  );
}
