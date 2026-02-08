import Sidebar from "@/components/sidebar";
import InService from "@/components/inservice";
import UpcomingService from "@/components/upcomingservice";
import ClosedService from "@/components/closedservice";

export default function PanelToday() {
  const inServiceList = [
    {
      time: "09:00",
      service: "Corte simples",
      cliente: "Anderson",
      barber: "Samuel",
    },
    {
      time: "10:00",
      service: "Corte e barba",
      cliente: "Gabriel",
      barber: "Samuel",
    },
    { time: "11:00", service: "Barba", cliente: "Vitor", barber: "Pedro" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="painel" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
          Painel do dia
        </h3>

        <article className="mt-16 border-b pb-6 border-[#d6d6d6]">
          <h4 className="text-xl text-[#757575]">Em Atendimento</h4>

          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Hórario</th>
                <th>Serviço</th>
                <th>Cliente</th>
                <th>Barbeiro</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {inServiceList.map((service) => (
                <InService
                  key={service.cliente}
                  time={service.time}
                  service={service.service}
                  cliente={service.cliente}
                  barber={service.barber}
                ></InService>
              ))}
            </tbody>
          </table>
        </article>

        <article className="mt-12 border-b pb-6 border-[#d6d6d6]">
          <h4 className="text-xl text-[#757575]">Proximos atendimentos</h4>

          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Hórario</th>
                <th>Serviço</th>
                <th>Cliente</th>
                <th>Barbeiro</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {inServiceList.map((service) => (
                <UpcomingService
                  key={service.cliente}
                  time={service.time}
                  service={service.service}
                  cliente={service.cliente}
                  barber={service.barber}
                ></UpcomingService>
              ))}
            </tbody>
          </table>
        </article>

        <article className="mt-12 border-b pb-6 border-[#d6d6d6]">
          <h4 className="text-xl text-[#757575]">Encerrados</h4>

          <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
            <thead>
              <tr className="text-[#0000d5]">
                <th>Hórario</th>
                <th>Serviço</th>
                <th>Cliente</th>
                <th>Barbeiro</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="text-[#757575]">
              {inServiceList.map((service) => (
                <ClosedService
                  key={service.cliente}
                  time={service.time}
                  service={service.service}
                  cliente={service.cliente}
                  barber={service.barber}
                ></ClosedService>
              ))}
            </tbody>
          </table>
        </article>
      </main>
    </div>
  );
}
