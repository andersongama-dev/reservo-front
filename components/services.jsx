export default function ServicesRow({ name, price, time, status }) {
  return (
    <tr className="h-10">
      <td>{name}</td>
      <td>{price}</td>
      <td>{time}</td>
      <td>
        <span className="text-[13px] text-black py-1 px-5 bg-[#8afc73] font-semibold rounded-full">
          {status}
        </span>
      </td>
      <td className="flex gap-4 items-center">
        <button className="w-6 h-h-10 text-orange-600 text-[16px] flex items-center justify-center">
          <i className="bi bi-pencil-square"></i>
        </button>

        <button className="w-6 h-10 text-red-600 flex items-center justify-center text-[26px]">
          <i className="bi bi-x"></i>
        </button>
      </td>
    </tr>
  );
}
