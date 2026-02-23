export default function Order({ id, name, email, func, status }) {
  const label = status === true ? "Pendente" : "Aceito";

  const bgColor = status === true ? "bg-orange-400" : "bg-green-500";

  return (
    <tr className="h-10">
      <td>{name}</td>
      <td>{email}</td>
      <td>{func}</td>
      <td>
        <span
          className={`text-[13px] text-white py-1 px-5 ${bgColor} font-semibold rounded-full`}
        >
          {label}
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
