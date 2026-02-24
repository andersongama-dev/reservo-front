"use client";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddInvitation({ onClose, by }) {
  const [invitation, setInvitation] = useState({
    code: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const addInvitation = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3333/invitation", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitation_code: invitation.code,
          invitation_by: by,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erro backend:", errorData);
        throw new Error("Erro ao enviar convite");
      }
      setStatus({
        type: "success",
        message: "convite enviado com sucesso!",
      });

      setInvitation({ code: "" });

      onClose();
      window.location.reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao enviar convite, tente novamente",
      });
    }
  };

  function validate() {
    if (!invitation.code) {
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
            Enviar convite
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
              inputPlaceholder="Código do barbeiro"
              value={invitation.code}
              onChange={(e) =>
                setInvitation({
                  ...invitation,
                  code: e.target.value,
                })
              }
            />
          </div>

          <Button variant="primary" onClick={addInvitation}>
            Enviar
          </Button>
        </div>
      </article>
    </div>
  );
}
