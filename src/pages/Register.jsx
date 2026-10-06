// Página de cadastro: cartão centralizado com a marca e o formulário de nova conta.
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <main className="pagina-auth">
      <section className="cartao-auth">
        <div className="marca">
          <img src="/icons/icon-192.png" alt="" width="56" height="56" />
          <h1>Gerenciador de Tarefas</h1>
          <p className="marca-subtitulo">Crie sua conta gratuitamente</p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
