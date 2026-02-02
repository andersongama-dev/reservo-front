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
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa5%2Fa5%2F59%2Fa5a55933ade2e2d5f90a95c0aa2c443f.jpg&f=1&nofb=1&ipt=aa0ba2753a1a1cace47fc6c0a3516bb6864304e40cfb68298039078d46386c9f"
          alt="Image barbe shop"
        />
      </section>
    </div>
  );
}
