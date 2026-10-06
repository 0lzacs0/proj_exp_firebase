// Página de login: cartão centralizado com a marca e o formulário de acesso.
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main className="pagina-auth">
      <section className="cartao-auth">
        <div className="marca">
          <img src="/icons/icon-192.png" alt="" width="56" height="56" />
          <h1>Gerenciador de Tarefas</h1>
          <p className="marca-subtitulo">Acesse sua conta para continuar</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
