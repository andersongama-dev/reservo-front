"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";
import Input from "@/components/input";
import Button from "@/components/button";

export default function CreateBarber() {
  const router = useRouter();

  const [barber, setBarber] = useState({
    name: "",
    city: "",
    phone: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const createBarber = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const normalizedPhone = barber.phone.replace(/\D/g, "");

    const payload = {
      ...barber,
      phone: normalizedPhone,
    };

    const createBarberWeb = true;

    if (createBarberWeb) {
      setStatus({
        type: "success",
        message: "barbearia cadastrada com sucesso!",
      });

      setBarber({
        name: "",
        city: "",
        phone: "",
      });

      router.push("/onboarding/owner/createbarber/addservices");
    } else {
      setStatus({
        type: "error",
        message: "Erro ao criar barbearia",
      });
    }
  };

  function handleLeft() {
    router.push("/onboarding/owner/");
  }

  function isValidBRPhone(phone) {
    if (!/^\d{10,11}$/.test(phone)) return false;
    if (phone.length === 11 && !/^(\d{2})9/.test(phone)) {
      return false;
    }

    return true;
  }

  function validate() {
    const normalizedPhone = barber.phone;

    if (!barber.name || !barber.city || !normalizedPhone) {
      setStatus({
        type: "error",
        message: "Preencha todos os campos obrigatórios",
      });
      return false;
    }

    if (!isValidBRPhone(normalizedPhone)) {
      setStatus({
        type: "error",
        message: "Telefone inválido",
      });
      return false;
    }

    return true;
  }

  function formatBRPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return (
    <div>
      <button
        className="text-left p-8 text-2xl text-[#757575] hover:text-[#0000d5] cursor-pointer"
        onClick={handleLeft}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <Bar value={70} />

      <div className="flex items-center justify-center mt-16">
        <article className="w-[30dvw]">
          <div className="flex flex-col gap-4 w-[30dvw]">
            <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
              Cadastrar barbearia
            </h2>
            <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
              Crie sua barbearia para começar a organizar a operação.
            </p>
          </div>

          <form onSubmit={createBarber}>
            <div className="grid gap-6 mt-12 w-[30dvw]">
              <Input
                inputType="text"
                inputPlaceholder="Nome da barbearia"
                value={barber.name}
                onChange={(e) => setBarber({ ...barber, name: e.target.value })}
              />
              <Input
                inputType="text"
                inputPlaceholder="Cidade"
                value={barber.city}
                onChange={(e) => setBarber({ ...barber, city: e.target.value })}
              />
              <Input
                inputType="tel"
                inputPlaceholder="Telefone"
                value={formatBRPhone(barber.phone)}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);

                  setBarber({
                    ...barber,
                    phone: digits,
                  });
                }}
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
