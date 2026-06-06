"use client";

import { useEffect, useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddScheduling({ onClose }) {
  const [services, setServices] = useState([]);

  const [scheduling, setScheduling] = useState({
    service_id: "",
    scheduled_time: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const response = await fetch("http://localhost:3333/service/all", {
        credentials: "include",
      });

      const data = await response.json();

      setServices(data.services || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function createScheduling(e) {
    e.preventDefault();

    if (!scheduling.service_id || !scheduling.scheduled_time) {
      setStatus({
        type: "error",
        message: "Preencha todos os campos",
      });

      return;
    }

    try {
      const response = await fetch("http://localhost:3333/scheduling", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduling),
      });

      if (!response.ok) {
        throw new Error();
      }

      onClose();
    } catch {
      setStatus({
        type: "error",
        message: "Erro ao criar agendamento",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-99999">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <article className="absolute right-0 top-0 p-8 bg-white border-l h-dvh border-[#d6d6d6] z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#0000d5] font-semibold">
            Novo agendamento
          </h3>

          <button onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="w-[30dvw] flex flex-col gap-8 mt-16">
          <select
            className="border p-3 rounded"
            value={scheduling.service_id}
            onChange={(e) =>
              setScheduling({
                ...scheduling,
                service_id: e.target.value,
              })
            }
          >
            <option value="">Selecione um serviço</option>

            {services?.map((service) => (
              <option key={service.serviceId} value={service.serviceId}>
                {service.serviceName}
              </option>
            ))}
          </select>

          <Input
            inputType="datetime-local"
            value={scheduling.scheduled_time}
            onChange={(e) =>
              setScheduling({
                ...scheduling,
                scheduled_time: e.target.value,
              })
            }
          />

          {status.message && <p className="text-red-500">{status.message}</p>}

          <Button variant="primary" onClick={createScheduling}>
            Criar agendamento
          </Button>
        </div>
      </article>
    </div>
  );
}
