"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Input from "@/components/input";
import Button from "@/components/button";
import Owner from "@/components/owner";
import Order from "@/components/order";

export default function BarberProfile() {
  const [barberDate, setBarberDate] = useState({
    name: "Ruan cortes",
    phone: "(19) 996779283",
    city: "Serra Negra",
    code: "BDK-3409",
  });

  const owners = [
    {
      name: "Ruan",
      email: "ruan@gmail.com",
      type: "Dono principal",
      status: "Ativo",
    },
    {
      name: "Pedro",
      email: "ruan@gmail.com",
      type: "Dono principal",
      status: "Ativo",
    },
    {
      name: "Lucas",
      email: "ruan@gmail.com",
      type: "Dono principal",
      status: "Ativo",
    },
  ];

  const orders = [
    {
      name: "Anderson Gama",
      email: "andersongama@gmail.com",
      func: "Barbeiro",
      status: "Pendente",
    },
    {
      name: "Juan Gama",
      email: "juangama@gmail.com",
      func: "Barbeiro",
      status: "Pendente",
    },
    {
      name: "Mirela Gama",
      email: "mirelagmama@gmail.com",
      func: "Barbeiro",
      status: "Pendente",
    },
  ];

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [disabled, setDisable] = useState(true);

  const handleEditToggle = (e) => {
    e.preventDefault();

    if (disabled) {
      setDisable(false);
      return;
    }

    if (!isValidBRPhone(barberDate.phone)) {
      setStatus({
        type: "error",
        message: "Número de telefone inválido",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Dados salvos com sucesso",
    });

    setDisable(true);
  };

  function isValidBRPhone(phone) {
    if (!/^\d{10,11}$/.test(phone)) return false;
    if (phone.length === 11 && !/^(\d{2})9/.test(phone)) {
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
    <div className="flex min-h-screen">
      <Sidebar activeScreen="barbearia" />

      <main className="flex-1 overflow-auto p-8 ml-56">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-[#757575] leading-relaxed tracking-[2%] font-semibold">
            Dados da barbearia
          </h3>

          <button className="py-2 px-4 bg-[#0000d5] text-white text-base font-semibold flex gap-4 tracking-[2%] leading-relaxed rounded items-center cursor-pointer">
            <i className="bi bi-plus"></i> Convidar
          </button>
        </div>

        <div className="mt-16 flex gap-16 pb-6 border-b border-[#d6d6d6]">
          <article className="flex flex-col gap-8 w-[30dvw]">
            <div className="flex flex-col gap-6">
              <Input
                inputType="text"
                inputPlaceholder="Nome da barbearia"
                disabled={disabled}
                value={barberDate.name}
                onChange={(e) =>
                  setBarberDate({ ...barberDate, name: e.target.value })
                }
              />
              <Input
                inputType="tel"
                inputPlaceholder="Número de telefone"
                disabled={disabled}
                value={formatBRPhone(barberDate.phone)}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);

                  setBarberDate({
                    ...barberDate,
                    phone: digits,
                  });

                  setStatus({ type: "", message: "" });
                }}
              />

              <Input
                inputType="text"
                inputPlaceholder="Cidade"
                disabled={disabled}
                value={barberDate.city}
                onChange={(e) =>
                  setBarberDate({ ...barberDate, city: e.target.value })
                }
              />
              <Input
                inputType="text"
                inputPlaceholder="Códgigo da barbearia"
                disabled={true}
                value={barberDate.code}
              />
            </div>

            <div
              className={`flex items-center w-[30dvw] text-base
                          ${status.type === "error" ? "text-red-600" : "text-green-600"}`}
            >
              {status.message && <span className="">{status.message}</span>}
            </div>

            <div className="w-[30dvw] flex justify-center mx-auto animate-fade-in">
              <Button
                variant="primary"
                type="button"
                onClick={handleEditToggle}
              >
                {disabled ? "Editar" : "Salvar"}
              </Button>
            </div>
          </article>

          <article className="w-full">
            <table className="w-full text-left leading-relaxed tracking-[2%]">
              <thead>
                <tr className="text-[#0000d5]">
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody className="text-[#757575]">
                {owners.map((owner) => (
                  <Owner
                    key={owner.name}
                    name={owner.name}
                    email={owner.email}
                    type={owner.type}
                    status={owner.status}
                  />
                ))}
              </tbody>
            </table>
          </article>
        </div>

        <div className="mt-12">
          <article className="mt-12">
            <h4 className="text-xl text-[#757575]">
              Aprovar pedidos de barbeiros
            </h4>

            <table className="w-full mt-8 text-left leading-relaxed tracking-[2%]">
              <thead>
                <tr className="text-[#0000d5]">
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Função</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody className="text-[#757575]">
                {orders.map((order) => (
                  <Order
                    key={order.name}
                    name={order.name}
                    email={order.email}
                    func={order.func}
                    status={order.status}
                  />
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </main>
    </div>
  );
}
