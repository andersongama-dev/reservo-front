export default function Order({ id, name, email, func, status }) {
  const label = status === true ? "Pendente" : "Aceito";

  const bgColor = status === true ? "bg-orange-400" : "bg-green-500";

  const accept = async () => {
    try {
      const response = await fetch("http://localhost:3333/invitation/accept", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitation_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao aceitar convite!");
      }

      window.location.reload();
    } catch (error) {}
  };

  const reject = async () => {
    try {
      const response = await fetch(`http://localhost:3333/invitation/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {},
      });

      if (!response.ok) {
        throw new Error("Erro ao recusar convite convite!");
      }

      window.location.reload();
    } catch (error) {}
  };

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

      <td className="flex gap-4 items-center">
        <button
          className="w-6 h-10 text-green-600 flex items-center justify-center text-[20px] cursor-pointer"
          onClick={accept}
        >
          <i className="bi bi-person-check"></i>
        </button>

        <button
          className="w-6 h-10 text-red-600 flex items-center justify-center text-[20px] cursor-pointer"
          onClick={reject}
        >
          <i className="bi bi-x"></i>
        </button>
      </td>
    </tr>
  );
}
