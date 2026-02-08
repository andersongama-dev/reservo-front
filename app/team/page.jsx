import Sidebar from "@/components/sidebar";
import TeamRow from "@/components/team";

export default function Services() {
  const teamList = [
    { name: "Ruan cortes", func: "Dono", operation: true, status: "Ativo" },
    { name: "Samuel", func: "Barbeiro", operation: true, status: "Ativo" },
    { name: "Rian", func: "Barbeiro", operation: true, status: "Ativo" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="funcionarios" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
            Funcionarios
          </h3>

          <button className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer">
            <i className="bi bi-plus"></i> Adicionar novo
          </button>
        </div>

        <article className="mt-16">
          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Nome</th>
                <th>Função</th>
                <th>Atende clientes</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {teamList.map((team) => (
                <TeamRow
                  key={team.name}
                  name={team.name}
                  func={team.func}
                  status={team.status}
                ></TeamRow>
              ))}
            </tbody>
          </table>
        </article>
      </main>
    </div>
  );
}
