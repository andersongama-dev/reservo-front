"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import Button from "@/components/button";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const loginUserWeb = true;

    if (loginUserWeb) {
      setStatus({
        type: "success",
        message: "Bem vindo novamente!",
      });

      setUser({
        name: "",
        email: "",
        password: "",
      });

      router.push("/agenda");
    } else {
      setStatus({
        type: "error",
        message: "Erro ao logar",
      });
    }
  };

  function validate() {
    if (!user.email || !user.password) {
      setStatus({
        type: "error",
        message: "Preencha email e senha",
      });
      return false;
    }

    return true;
  }

  return (
    <div className="grid grid-cols-2 h-dvh overflow-y-hidden">
      <section className="flex flex-col items-center justify-center w-[50dvw] h-dvh">
        <article className="flex flex-col gap-4 w-[30dvw]">
          <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
            Entrar
          </h2>
          <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
            Volte para a sua agenda e continue o seu dia.
          </p>
        </article>

        <form className="w-[30dvw]" onSubmit={loginUser}>
          <article className="flex flex-col gap-6 mt-16">
            <Input
              inputType="email"
              inputPlaceholder="E-mail"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <Input
              inputType="password"
              inputPlaceholder="Senha"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <div
              className={`flex items-center w-[30dvw] text-base
              ${status.type === "error" ? "text-red-600" : "text-green-600"}`}
            >
              {status.message && <span>{status.message}</span>}

              <a
                href="#"
                className="ml-auto text-[#757575] tracking-[2%] hover:text-[#0000d5]"
              >
                Esqueceu a senha?
              </a>
            </div>
          </article>

          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </form>

        <a
          href="/register"
          className="mt-8 text-center text-[#757575] text-base tracking-[2%] hover:text-[#0000d5]"
        >
          Não tem uma conta? Crie uma!
        </a>
      </section>

      <section className="w-[50dvw] h-dvh">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1621645582931-d1d3e6564943%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmJlcnNob3B8ZW58MHx8MHx8%26w%3D1000%26q%3D80&f=1&nofb=1&ipt=c521c1f0b8c36b7518b0285c3ae9a3d83700e3cd7e2372820a511dec3141d35b"
          alt="Image barber shop"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}
