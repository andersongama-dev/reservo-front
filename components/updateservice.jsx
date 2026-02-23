"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Input from "@/components/input";
import Select from "@/components/select";
import Button from "@/components/button";

export default function UpdateService({
  onClose,
  serviceId,
  serviceName,
  serviceTime,
  servicePrice,
  serviceStatus,
}) {
  const [mounted, setMounted] = useState(false);

  const [service, setService] = useState({
    id: serviceId,
    name: serviceName,
    time: serviceTime,
    price: servicePrice,
    status: Boolean(serviceStatus),
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const updateService = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3333/service/update", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: service.id,
          service_name: service.name,
          service_duration: service.time,
          service_price: service.price,
          service_status: service.status,
        }),
      });

      if (!response.ok) throw new Error("Erro ao editar serviço");

      setStatus({
        type: "success",
        message: "Serviço editado com sucesso!",
      });

      setService({ id: "", name: "", time: "", price: "" });

      onClose();
      window.location.reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao editar serviço, tente novamente",
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

  return createPortal(
    <div className="fixed inset-0 z-99999">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <article className="absolute right-0 top-0 p-8 bg-white border-l h-dvh border-[#d6d6d6] z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#0000d5] leading-relaxed tracking-[2%] font-semibold">
            Editar serviço
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
            <Select
              value={service.status}
              onChange={(e) =>
                setService({ ...service, status: e.target.value === "true" })
              }
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </Select>
          </div>

          <Button variant="primary" onClick={updateService}>
            Continuar
          </Button>
        </div>
      </article>
    </div>,
    document.body,
  );
}
