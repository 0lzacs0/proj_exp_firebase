// Formulário de login com validação amigável e mensagens de erro em pt-BR.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { traduzirErroAuth } from "../utils/authErrors";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Valida os campos antes de acionar o Firebase
  function validar() {
    if (!email.trim()) return "Digite seu e-mail.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Digite um e-mail válido.";
    if (!senha) return "Digite sua senha.";
    return "";
  }

  // Submete o formulário e redireciona para as tarefas em caso de sucesso
  async function aoEnviar(evento) {
    evento.preventDefault();
    const mensagemValidacao = validar();
    if (mensagemValidacao) {
      setErro(mensagemValidacao);
      return;
    }
    setErro("");
    setEnviando(true);
    try {
      await login(email.trim(), senha);
      navigate("/tarefas");
    } catch (erroFirebase) {
      setErro(traduzirErroAuth(erroFirebase));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={aoEnviar} noValidate>
      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}
      <div className="campo">
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
      </div>
      <div className="campo">
        <label htmlFor="login-senha">Senha</label>
        <input
          id="login-senha"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
        />
      </div>
      <button type="submit" className="botao-primario" disabled={enviando}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
      <p className="alternar-auth">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </form>
  );
}
