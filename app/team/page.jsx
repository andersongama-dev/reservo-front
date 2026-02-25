"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import TeamRow from "@/components/team";
import AddInvitation from "@/components/addinvitation";

export default function Team() {
  const [teamList, setTeamList] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const response = await fetch("http://localhost:3333/employee/all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar");
        }

        const data = await response.json();

        const formattedTeam = data.employees.map((employee) => ({
          id: employee.barberId,
          name: employee.user.userName,
          func: employee.barberFunction,
          status: employee.user.userStatus,
        }));

        setTeamList(formattedTeam);
      } catch (error) {
        console.error(error);
      }
    };

    getTeam();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="funcionarios" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
            Funcionarios
          </h3>

          <button
            onClick={() => setAddOpen(true)}
            className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer"
          >
            <i className="bi bi-plus"></i> Convidar
          </button>
        </div>

        <article className="mt-16">
          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Nome</th>
                <th>Função</th>
                {/* <th>Atende clientes</th> */}
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {teamList.map((team) => (
                <TeamRow
                  id={team.id}
                  key={team.id}
                  name={team.name}
                  func={team.func}
                  status={team.status}
                />
              ))}
            </tbody>
          </table>
        </article>
      </main>

      {addOpen && (
        <AddInvitation
          menuTogle={addOpen}
          by={"barbershop"}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  );
}
