"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar";
import Input from "@/components/input";
import Day from "@/components/day";
import Timetables from "@/components/timetables";
import Scheduling from "@/components/scheduling";
import AddScheduling from "@/components/addScheduling";

export default function Agenda() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showAddScheduling, setShowAddScheduling] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const timeTables = [
    { time: "09:00" },
    { time: "10:00" },
    { time: "11:00" },
    { time: "12:00" },
    { time: "13:00" },
    { time: "14:00" },
    { time: "15:00" },
    { time: "16:00" },
    { time: "17:00" },
    { time: "18:00" },
    { time: "19:00" },
    { time: "20:00" },
    { time: "21:00" },
    { time: "22:00" },
    { time: "23:00" },
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

  useEffect(() => {
    loadSchedulings();
  }, []);

  async function loadSchedulings() {
    try {
      const response = await fetch("http://localhost:3333/scheduling/all", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar agendamentos");
      }

      setAgendamentos(data);
    } catch (error) {
      console.error(error);
    }
  }

  const grid = Array.from({ length: 15 }, () => Array(7).fill(null));

  const startOfWeek = new Date(currentDate);

  const day = startOfWeek.getDay();

  const offset = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + offset);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);

    date.setDate(startOfWeek.getDate() + index);

    return {
      date,
      day: date.toLocaleDateString("pt-BR", {
        weekday: "long",
      }),
      label: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
  });

  const schedulingsOfMonth = agendamentos.filter((agendamento) => {
    const date = new Date(agendamento.schedulingDate);

    return (
      date.getUTCMonth() === currentDate.getMonth() &&
      date.getUTCFullYear() === currentDate.getFullYear()
    );
  });

  schedulingsOfMonth.forEach((agendamento) => {
    const date = new Date(agendamento.schedulingDate);

    const dayNumber = date.getUTCDate();

    const hour = date.getUTCHours();

    const weekDayIndex = weekDays.findIndex(
      (d) => d.date.getDate() === dayNumber,
    );

    const rowIndex = hour - 9;

    if (weekDayIndex !== -1 && rowIndex >= 0 && rowIndex < 15) {
      grid[rowIndex][weekDayIndex] = {
        cliente:
          agendamento.user?.name || agendamento.user?.username || "Cliente",

        service: agendamento.service?.serviceName || "Serviço",
      };
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclaritycareconsulting.co.uk%2Fwp-content%2Fuploads%2F2023%2F05%2FBlank-Profile-Picture.jpg"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <select
              name="agenda"
              id="agenda"
              className="text-base text-[#757575]"
            >
              <option value="1">Nome do barbeiro</option>
            </select>
          </div>
        </div>

        <div className="mt-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1,
                  ),
                )
              }
            >
              ←
            </button>

            <h5 className="text-3xl font-semibold text-[#757575]">
              {currentDate.toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </h5>

            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1,
                  ),
                )
              }
            >
              →
            </button>
          </div>

          <button
            onClick={() => setShowAddScheduling(true)}
            className="py-2 px-4 bg-[#0000d5] text-white rounded flex gap-2 items-center cursor-pointer"
          >
            <i className="bi bi-plus"></i>
            Adicionar novo
          </button>
        </div>

        <div className="flex mt-12">
          <div className="p-6 text-5xl bg-[#ccccf7] text-[#0000d5]">
            <i className="bi bi-calendar-check"></i>
          </div>

          <div className="grid grid-cols-7 w-full bg-[#ebebfc] text-center font-semibold text-[#757575]">
            {weekDays.map((day) => (
              <Day key={day.label} day={day.day} date={day.label} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-12">
          <div>
            <div className="grid gap-4 text-base font-semibold text-[#757575]">
              {timeTables.map((time) => (
                <Timetables key={time.time} time={time.time} />
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

      {showAddScheduling && (
        <AddScheduling
          onClose={() => {
            setShowAddScheduling(false);
            loadSchedulings();
          }}
        />
      )}
    </div>
  );
}
