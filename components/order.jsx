export default function Order({ name, email, func, status }) {
  return (
    <tr className="h-10">
      <td>{name}</td>
      <td>{email}</td>
      <td>{func}</td>
      <td>
        <span className="text-[13px] text-black py-1 px-5 bg-orange-400 font-semibold rounded-full">
          {status}
        </span>
      </td>

      <td>
        <button className="w-6 h-10 text-green-600 flex items-center justify-center text-[20px] cursor-pointer">
          <i className="bi bi-person-check"></i>
        </button>
      </td>
    </tr>
  );
}
