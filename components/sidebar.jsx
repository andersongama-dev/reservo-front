"use client";

import { useState } from "react";

export default function Sidebar({ activeScreen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const menuItems = [
    {
      id: "agenda",
      icon: "bi-calendar-check",
      label: "Agenda",
      link: "agenda",
    },
    {
      id: "painel",
      icon: "bi-bar-chart",
      label: "Painel do dia",
      link: "paneltoday",
    },
    { id: "servicos", icon: "bi-tag", label: "Serviços", link: "services" },
    {
      id: "funcionarios",
      icon: "bi-person-gear",
      label: "Funcionarios",
      link: "team",
    },
    { id: "barbearia", icon: "bi-person", label: "Barbearia", link: "barber" },
  ];

  return (
    <div>
      <button
        className={`btn-menu ${menuOpen ? "btn-open" : ""}`}
        onClick={toggleMenu}
      >
        <i
          className={`bi ${menuOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
        ></i>
      </button>

      <nav className="flex flex-col justify-between p-8 border-[#d6d6d6] fixed menu-border">
        <article>
          <div className="flex gap-4 items-center">
            <div className="text-[20px] w-8 h-8 bg-[#0000d5] flex items-center justify-center text-white logo">
              R
            </div>
          </div>

          <div className="mt-16">
            <ul className="grid gap-8 text-2xl text-[#757575]">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className={`flex gap-4 items-center ${
                      activeScreen === item.id ? "text-[#0000d5] font-bold" : ""
                    }`}
                  >
                    <i
                      className={`bi ${item.icon} ${activeScreen === item.id ? "text-[#0000d5]" : ""}`}
                    ></i>
                    <p className={`text-base ${menuOpen ? "" : "close"}`}>
                      {item.label}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article>
          <ul className="grid gap-8 text-2xl text-[#757575]">
            <li>
              <a
                href="settings"
                className={`flex gap-4 items-center ${
                  activeScreen === "configuracoes"
                    ? "text-[#0000d5] font-bold"
                    : ""
                }`}
              >
                <i
                  className={`bi bi-gear ${activeScreen === "configuracoes" ? "text-[#0000d5]" : ""}`}
                ></i>
                <p className={`text-base ${menuOpen ? "" : "close"}`}>
                  Configurações
                </p>
              </a>
            </li>
          </ul>
        </article>
      </nav>
    </div>
  );
}
