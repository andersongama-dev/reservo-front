"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import ServicesRow from "@/components/services";
import AddService from "@/components/addservices";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("http://localhost:3333/service/all", {
          method: "GET",
          credentials: "include",
          headers: {},
        });

        if (!response.ok) throw new Error("Erro ao buscar serviços");

        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="servicos" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
            Serviços
          </h3>

          <button
            onClick={() => setAddOpen(true)}
            className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer"
          >
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
              {services.map((service) => (
                <ServicesRow
                  key={service.serviceId}
                  id={service.serviceId}
                  name={service.serviceName}
                  price={service.servicePrice}
                  time={service.serviceDuration}
                  status={service.serviceStatus}
                />
              ))}
            </tbody>
          </table>
        </article>
      </main>

      {addOpen && (
        <AddService menuTogle={addOpen} onClose={() => setAddOpen(false)} />
      )}
    </div>
  );
}
