"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import Input from "@/components/input";
import Button from "@/components/button";

export default function Employee() {
  const router = useRouter();

  const [barber, setBarber] = useState({
    barber: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const set = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const setBarberWeb = true;

    if (setBarberWeb) {
      setStatus({
        type: "success",
        message: "Usuário criado com sucesso!",
      });

      setBarber({
        barber: "",
      });

      router.push("/agenda");
    } else {
      setStatus({
        type: "error",
        message: "Erro ao vincular com a barbearia",
      });
    }
  };

  function handleLeft() {
    router.push("/onboarding");
  }

  function validate() {
    if (!barber.barber) {
      setStatus({
        type: "error",
        message: "Preencha todos os campos",
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

      <Bar value={90} />

      <div className="flex items-center justify-center mt-16">
        <article className="w-[30dvw]">
          <div className="flex flex-col gap-4 w-[30dvw]">
            <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
              Qual barbearia você trabalha?
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Digite o código da barbearia para continuar.
            </p>
          </div>

          <form onSubmit={set}>
            <div className="mt-12 w-[30dvw]">
              <Input
                inputType="text"
                inputPlaceholder="Nome"
                value={barber.barber}
                onChange={(e) =>
                  setBarber({ ...barber, barber: e.target.value })
                }
              />

              <div
                className={` flex items-center w-[30dvw] text-base
              ${status.type === "error" ? "text-red-600" : "text-green-600"}`}
              >
                {status.message && (
                  <span className="mt-6">{status.message}</span>
                )}
              </div>
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
