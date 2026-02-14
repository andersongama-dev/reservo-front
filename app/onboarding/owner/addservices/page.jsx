"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddServices() {
  const router = useRouter();

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
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encotrado");
      }

      const response = await fetch("http://localhost:3333/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_name: service.name,
          service_duration: service.time,
          service_price: service.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar");
      }

      setStatus({
        type: "success",
        message: "Serviço criado com sucesso!",
      });

      setService({
        name: "",
        time: "",
        price: "",
      });

      router.push("/onboarding/owner/addservices/addteamchoice");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao adicionar serviço, tente novamente",
      });
    }
  };

  function handleLeft() {
    router.push("/onboarding/owner/");
  }

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
    <div>
      <button
        className="text-left p-8 text-2xl text-[#757575] hover:text-[#0000d5] cursor-pointer"
        onClick={handleLeft}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <Bar value={95} />

      <div className="flex items-center justify-center mt-16">
        <article className="w-[30dvw]">
          <div className="flex flex-col gap-4 w-[30dvw]">
            <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
              Adiconar serviços
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Adicione um serviço pra continuar.
            </p>
          </div>

          <form onSubmit={addService}>
            <div className="grid gap-6 mt-12 w-[30dvw]">
              <Input
                inputType="text"
                inputPlaceholder="Nome do serviço"
                value={service.name}
                onChange={(e) =>
                  setService({ ...service, name: e.target.value })
                }
              />
              <Input
                inputType="number"
                inputPlaceholder="Duração (min)"
                value={service.time}
                onChange={(e) =>
                  setService({ ...service, time: e.target.value })
                }
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

            <div
              className={`flex items-center w-[30dvw] text-base
              ${status.type === "error" ? "text-red-600" : "text-green-600"}`}
            >
              {status.message && <span className="mt-6">{status.message}</span>}
            </div>
            <div className="w-[30dvw] flex justify-center mx-auto animate-fade-in">
              <Button variant="primary" type="submit">
                Continuar
              </Button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}
