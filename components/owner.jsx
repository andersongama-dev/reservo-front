export default function Owner({ name, email, type, status }) {
  return (
    <tr className="h-10">
      <td>{name}</td>
      <td>{email}</td>
      <td>{type}</td>
      <td>
        <span className="text-[13px] text-black py-1 px-5 bg-[#8afc73] font-semibold rounded-full">
          {status}
        </span>
      </td>

      <td>
        <button className="w-6 h-10 text-[#757575] flex items-center justify-center text-[20px]">
          <i className="bi bi-person-x"></i>
        </button>
      </td>
    </tr>
  );
}
