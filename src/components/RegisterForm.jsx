// Formulário de cadastro com validação amigável e mensagens de erro em pt-BR.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { traduzirErroAuth } from "../utils/authErrors";

// Tamanho mínimo de senha exigido pelo Firebase Authentication
const SENHA_MINIMA = 6;

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Valida os campos antes de acionar o Firebase
  function validar() {
    if (!email.trim()) return "Digite seu e-mail.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Digite um e-mail válido.";
    if (!senha) return "Digite uma senha.";
    if (senha.length < SENHA_MINIMA)
      return `A senha deve ter pelo menos ${SENHA_MINIMA} caracteres.`;
    return "";
  }

  // Cria a conta e redireciona para as tarefas em caso de sucesso
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
      await register(email.trim(), senha);
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
        <label htmlFor="cadastro-email">E-mail</label>
        <input
          id="cadastro-email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
      </div>
      <div className="campo">
        <label htmlFor="cadastro-senha">Senha</label>
        <input
          id="cadastro-senha"
          type="password"
          autoComplete="new-password"
          placeholder={`Mínimo de ${SENHA_MINIMA} caracteres`}
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
        />
      </div>
      <button type="submit" className="botao-primario" disabled={enviando}>
        {enviando ? "Criando conta…" : "Criar conta"}
      </button>
      <p className="alternar-auth">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}
