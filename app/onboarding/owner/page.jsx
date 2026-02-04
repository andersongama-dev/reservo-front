"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import ChoiceCard from "@/components/choiceCard";
import Button from "@/components/button";

export default function OnBoarding() {
  const [choice, setChoice] = useState("");
  const router = useRouter();

  function handleContinue() {
    switch (choice) {
      case "barberManager":
        break;
      case "manager":
        break;
    }

    router.push("/onboarding/owner/createbarber");
  }

  function handleLeft() {
    router.push("/onboarding");
  }

  return (
    <div>
      <button
        className="text-left p-8 text-2xl text-[#757575] hover:text-[#0000d5] cursor-pointer"
        onClick={handleLeft}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <Bar value={60} />

      <div className="flex items-center justify-center mt-16">
        <article className="w-[30dvw]">
          <div className="flex flex-col gap-4 w-[30dvw]">
            <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
              Você também atende clientes?
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Essa informação ajusta sua agenda e suas permições.
            </p>
          </div>

          <div className="grid gap-6 mt-12 w-[30dvw]">
            <ChoiceCard
              label="Além de gerenciar, também realizo atendimentos"
              value="barberManager"
              selected={choice === "barberManager"}
              onSelect={setChoice}
            />

            <ChoiceCard
              label="Não realizo atendimentos, apenas gerencio a barbearia"
              value="manager"
              selected={choice === "manager"}
              onSelect={setChoice}
            />
          </div>
        </article>
      </div>

      {choice && (
        <div className="w-[30dvw] flex justify-center mx-auto animate-fade-in">
          <Button variant="primary" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      )}
    </div>
  );
}
