"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import ChoiceCard from "@/components/choiceCard";
import Button from "@/components/button";

export default function AddTeamChoice() {
  const [choice, setChoice] = useState("");
  const router = useRouter();

  async function handleContinue() {
    switch (choice) {
      case "now":
        router.push("/onboarding/owner/addservices/addteamchoice/addteam");
        break;
      case "alone":
        await complete();
        window.location.href = "/agenda";
        break;
    }
  }

  const complete = async () => {
    await fetch("http://localhost:3333/onboarding", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  function handleLeft() {
    router.push("/onboarding/owner/addservices");
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
              Adicionar equipe
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Sua barbearia tem outros barbeiros?
            </p>
          </div>

          <div className="grid gap-6 mt-12 w-[30dvw]">
            <ChoiceCard
              label="Quero adiocnar ou convidar barbeiros agora"
              value="now"
              selected={choice === "now"}
              onSelect={setChoice}
            />

            <ChoiceCard
              label="Vou trabalhar sozinho por enquanto"
              value="alone"
              selected={choice === "alone"}
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
