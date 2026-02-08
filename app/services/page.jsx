import Sidebar from "@/components/sidebar";
import ServicesRow from "../../components/services";

export default function Services() {
  const servicesList = [
    { name: "Corte simples", price: "R$ 40,00", time: "40", status: "Ativo" },
    {
      name: "Corte na tesoura",
      price: "R$ 45,00",
      time: "60",
      status: "Ativo",
    },
    { name: "Corte e barba", price: "R$ 120,00", time: "100", status: "Ativo" },
    { name: "Barba", price: "R$ 80,00", time: "60", status: "Ativo" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="servicos" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
            Serviços
          </h3>

          <button className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer">
            <i className="bi bi-plus"></i> Adicionar novo
          </button>
        </div>

        <article className="mt-16">
          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Nome do serviço</th>
                <th>Preço</th>
                <th>Duração (min)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {servicesList.map((service) => (
                <ServicesRow
                  key={service.name}
                  name={service.name}
                  price={service.price}
                  time={service.time}
                  status={service.status}
                ></ServicesRow>
              ))}
            </tbody>
          </table>
        </article>
      </main>
    </div>
  );
}
