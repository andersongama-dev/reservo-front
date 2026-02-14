"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddTeam() {
  const router = useRouter();

  const [professional, setProfessional] = useState({
    code: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const addProfessional = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const addProfessionalWeb = true;

    if (addProfessionalWeb) {
      setStatus({
        type: "success",
        message: "Barbeiro adicionado com sucesso!",
      });

      setProfessional({
        code: "",
      });

      router.push("/agenda");
    } else {
      setStatus({
        type: "error",
        message: "Erro ao adicionar barbeiro, tente novamente",
      });
    }
  };

  function handleLeft() {
    router.push("/onboarding/owner/addservices/addteamchoice");
  }

  function validate() {
    if (!professional.code) {
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
              Adiconar equipe
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Adicione ao menos um profissinal pra continuar.
            </p>
          </div>

          <form onSubmit={addProfessional}>
            <div className="grid gap-6 mt-12 w-[30dvw]">
              <Input
                inputType="text"
                inputPlaceholder="Código do barbeiro"
                value={professional.code}
                onChange={(e) =>
                  setProfessional({ ...professional, code: e.target.value })
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
