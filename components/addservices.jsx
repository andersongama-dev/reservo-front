"use client";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddService({ onClose }) {
  const [service, setService] = useState({
    name: "",
    time: "",
    price: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const addService = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3333/service", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_name: service.name,
          service_duration: service.time,
          service_price: service.price,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar");

      setStatus({
        type: "success",
        message: "Serviço criado com sucesso!",
      });

      setService({ name: "", time: "", price: "" });

      onClose();
      window.location.reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao adicionar serviço, tente novamente",
      });
    }
  };

  function validate() {
    if (!service.name || !service.time || !service.price) {
      setStatus({
        type: "error",
        message: "Preencha todos os campos obrigatórios",
      });
      return false;
    }
    return true;
  }

  return (
    <div className="fixed inset-0 z-99999">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <article className="absolute right-0 top-0 p-8 bg-white border-l h-dvh border-[#d6d6d6] z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#0000d5] leading-relaxed tracking-[2%] font-semibold">
            Adicionar serviço
          </h3>

          <button
            onClick={onClose}
            className="text-2xl text-[#757575] cursor-pointer"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="w-[30dvw] flex flex-col gap-8 mt-16">
          <div className="flex flex-col gap-6">
            <Input
              inputType="text"
              inputPlaceholder="Nome do serviço"
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
            />
            <Input
              inputType="number"
              inputPlaceholder="Duração (min)"
              value={service.time}
              onChange={(e) => setService({ ...service, time: e.target.value })}
            />
            <Input
              inputType="number"
              inputPlaceholder="Preço"
              value={service.price}
              onChange={(e) =>
                setService({ ...service, price: e.target.value })
              }
            />
          </div>

          <Button variant="primary" onClick={addService}>
            Continuar
          </Button>
        </div>
      </article>
    </div>
  );
}
