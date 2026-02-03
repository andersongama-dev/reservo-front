import Input from "../../components/input";
import Button from "../../components/button";

export default function Register() {
    return(
        <div className="grid grid-cols-2 h-dvh overflow-y-hidden">
              <section className="flex flex-col items-center justify-center w-[50dvw] h-dvh">
                <article className="flex flex-col gap-4 w-[30dvw]">
                  <h2 className="text-[#0000d5] font-bold text-[35px] tracking-[1%] leading-[1.3]">
                    Criar conta
                  </h2>
                  <p className="text-[#757575] text-[25px] tracking-[2%] leading-relaxed">
                    Prepare sua barbearia para trabalhar no automático.
                  </p>
                </article>
        
                <form className="w-[30dvw]">
                  <article className="flex flex-col gap-6 mt-16">
                    <Input inputType="text" inputPlaceholder="Nome" />

                    <Input inputType="email" inputPlaceholder="E-mail" />
        
                    <Input inputType="password" inputPlaceholder="Senha" />

                    <Input inputType="password" inputPlaceholder="Confirmar senha" />
                  </article>
        
                  <Button variant="primary" type="submit">
                    Continuar
                  </Button>
                </form>
        
                <a
                  href="/login"
                  className="mt-8 text-center text-[#757575] text-base tracking-[2%] hover:text-[#0000d5]"
                >
                  Já possui uma conta? Acesse agora!
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
    )
}