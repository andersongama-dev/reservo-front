import { useState } from "react";
import UpdateService from "./updateservice";

export default function ServicesRow({ id, name, price, time, status }) {
  const [open, setOpen] = useState(false);

  const isActive = Boolean(status);

  const statusMessage = isActive ? "Ativo" : "Inativo";
  const statusClass = isActive
    ? "bg-[#8afc73] text-black"
    : "bg-gray-300 text-gray-700";

  const deleteService = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/service/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {},
        },
      );

      if (!response.ok) throw new Error("Erro ao deletar serviço");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr className="h-10">
        <td>{name}</td>
        <td>R$ {price}</td>
        <td>{time}</td>
        <td>
          <span
            className={`text-[13px] py-1 px-5 font-semibold rounded-full ${statusClass}`}
          >
            {statusMessage}
          </span>
        </td>
        <td className="flex gap-4 items-center">
          <button
            className="w-6 h-10 text-orange-600 text-[16px] flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            className="w-6 h-10 text-red-600 flex items-center justify-center text-[26px] cursor-pointer"
            onClick={deleteService}
          >
            <i className="bi bi-x"></i>
          </button>
        </td>
      </tr>

      {open && (
        <UpdateService
          onClose={() => setOpen(false)}
          serviceId={id}
          serviceName={name}
          servicePrice={price}
          serviceTime={time}
          serviceStatus={status}
        />
      )}
    </>
  );
}
