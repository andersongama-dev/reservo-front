import Sidebar from "@/components/sidebar";
import Input from "@/components/input";
import Day from "@/components/day";
import Timetables from "@/components/timetables";
import Scheduling from "@/components/scheduling";

export default function Agenda() {
  const weekDays = [
    { day: "Segunda", date: "04-05" },
    { day: "Terça", date: "05-05" },
    { day: "Quarta", date: "06-05" },
    { day: "Quinta", date: "07-05" },
    { day: "Sexta", date: "08-05" },
    { day: "Sábado", date: "09-05" },
    { day: "Domingo", date: "10-05" },
  ];

  const timeTables = [
    { time: "09:00" },
    { time: "10-00" },
    { time: "11-00" },
    { time: "12-00" },
    { time: "13-00" },
    { time: "14-00" },
    { time: "15-00" },
    { time: "16-00" },
    { time: "17-00" },
    { time: "18-00" },
    { time: "19-00" },
    { time: "20-00" },
    { time: "21-00" },
    { time: "22-00" },
    { time: "23-00" },
  ];

  const week = {
    Segunda: 0,
    Terça: 1,
    Quarta: 2,
    Quinta: 3,
    Sexta: 4,
    Sábado: 5,
    Domingo: 6,
  };

  const agendamentos = [
    {
      cliente: "Anderson",
      service: "Corte simples",
      dia: "Segunda",
      horario: 9,
    },
    {
      cliente: "Gabriel",
      service: "Corte simples",
      dia: "Segunda",
      horario: 10,
    },
    {
      cliente: "Vitor CEE",
      service: "Corte e barba",
      dia: "Segunda",
      horario: 11,
    },

    {
      cliente: "Pedro",
      service: "Corte e barba",
      dia: "Terça",
      horario: 15,
    },
  ];

  const grid = Array.from({ length: 15 }, () => Array(7).fill(null));

  agendamentos.forEach((agendamento) => {
    const diaIndex = week[agendamento.dia];
    const horarioIndex = agendamento.horario - 9;

    if (diaIndex !== undefined && horarioIndex >= 0) {
      grid[horarioIndex][diaIndex] = agendamento;
    }
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="agenda" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <div className="w-[30dvw]">
            <Input inputType="text" inputPlaceholder="Pesquisar" />
          </div>

          <div className="flex items-center gap-4">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclaritycareconsulting.co.uk%2Fwp-content%2Fuploads%2F2023%2F05%2FBlank-Profile-Picture.jpg&f=1&nofb=1&ipt=23f61c5a25d8d57df3e6444e87f95bc9d6986eefc64b789ca2464151cc729997"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
            <select
              name="agenda"
              id="agenda"
              className="text-base text-[#757575]"
            >
              <option value="1">Nome do barbeiro</option>
              <option value="2">Nome do barbeiro</option>
            </select>
          </div>
        </div>
        <div className="mt-16 flex justify-between items-center">
          <h5 className="text-3xl font-semibold text-[#757575] tracking-[2%] leading-relaxed">
            May, 2026
          </h5>

          <div className="flex gap-6">
            <button className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer">
              <i className="bi bi-plus"></i> Adicionar novo
            </button>
          </div>
        </div>
        <div className="flex mt-12">
          <div className="p-6 text-5xl bg-[#ccccf7] text-[#0000d5]">
            <i className="bi bi-calendar-check"></i>
          </div>
          <div className="grid grid-cols-7 w-full bg-[#ebebfc] text-center font-semibold text-[#757575] tracking-[2%] leading-relaxed">
            {weekDays.map((day) => (
              <Day key={day.date} day={day.day} date={day.date} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-12">
          <div>
            <div className="text-base font-semibold text-[#757575] tracking-[2%] leading-relaxed grid gap-4">
              {timeTables.map((time) => (
                <Timetables key={time.time} time={time.time}></Timetables>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 grid-rows-15 w-full gap-2 px-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  {cell && (
                    <Scheduling
                      cliente={cell.cliente}
                      service={cell.service}
                      row={rowIndex}
                      column={colIndex}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
