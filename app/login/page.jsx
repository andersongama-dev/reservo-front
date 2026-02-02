export default function Login() {
  return (
    <div className="login">
      <section className="form-login">
        <article className="title-sub">
          <h2>Entrar</h2>
          <p>Volte para a sua agenda e continue o seu dia.</p>
        </article>

        <form action="">
          <article className="main-login">
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <a href="#">Esqueceu a senha?</a>
          </article>

          <button className="primary-button">Entrar</button>
        </form>

        <a href="#" className="link-register">
          Não tem uma conta? Crie uma!
        </a>
      </section>

      <section className="banner-initial">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1621645582931-d1d3e6564943%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmJlcnNob3B8ZW58MHx8MHx8%26w%3D1000%26q%3D80&f=1&nofb=1&ipt=c521c1f0b8c36b7518b0285c3ae9a3d83700e3cd7e2372820a511dec3141d35b"
          alt="Image barbe shop"
        />
      </section>
    </div>
  );
}
