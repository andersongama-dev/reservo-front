"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import ChoiceCard from "@/components/choiceCard";
import Button from "@/components/button";

export default function OnBoarding() {
  const [choice, setChoice] = useState("");
  const router = useRouter();

  async function handleContinue() {
    try {
      switch (choice) {
        case "barber":
          await roleUser(choice);
          router.push("/onboarding/typebarber");
          break;
        case "customer":
          router.push("/onboarding/professional");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLeft() {
    router.push("/register");
  }

  async function roleUser(choiceUser) {
    const response = await fetch("http://localhost:3333/edit", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_role: choiceUser,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na escolha");
    }
  }

  return (
    <div>
      <button
        className="text-left p-8 text-2xl text-[#757575] hover:text-[#0000d5] cursor-pointer"
        onClick={handleLeft}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <Bar value={50} />

      <div className="flex items-center justify-center mt-16">
        <article className="w-[30dvw]">
          <div className="flex flex-col gap-4 w-[30dvw]">
            <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
              Como você vai usar o sistema?
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Escolha a opção que mais representa você.
            </p>
          </div>

          <div className="grid gap-6 mt-12 w-[30dvw]">
            <ChoiceCard
              label="Sou cliente de alguma barbearia"
              value="customer"
              selected={choice === "customer"}
              onSelect={setChoice}
            />

            <ChoiceCard
              label="Sou barbeiro ou possui uma barbearia"
              value="barber"
              selected={choice === "barber"}
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
