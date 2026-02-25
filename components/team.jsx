import { useState } from "react";

export default function TeamRow({ id, name, func, operation, status }) {
  const statusText = status === true ? "Ativo" : "Inativo";
  const funcText = func === "owner" ? "Dono" : "Barbeiro";

  const dismiss = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/employee/dismiss/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {},
        },
      );

      if (!response.ok) throw new Error("Erro ao deletar serviço");

      window.location.reload();
    } catch (error) {}
  };

  return (
    <tr className="h-10">
      <td>{name}</td>
      <td>{funcText}</td>
      {/*<td>
        <button className="w-6 h-h-10 text-green-600 text-[24px] flex items-center justify-center">
          <i className="bi bi-check"></i>
        </button>
      </td>*/}
      <td>
        <span className="text-[13px] text-black py-1 px-5 bg-[#8afc73] font-semibold rounded-full">
          {statusText}
        </span>
      </td>
      <td className="flex gap-4 items-center">
        {func !== "owner" && (
          <button
            onClick={dismiss}
            className="w-6 h-10 text-[#757575] flex items-center justify-center text-[20px] cursor-pointer"
          >
            <i className="bi bi-person-x"></i>
          </button>
        )}
      </td>
    </tr>
  );
}
