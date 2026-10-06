// Página principal (protegida): cabeçalho com logout, formulário de
// criação/edição de tarefas e lista em tempo real do usuário logado.
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const { user, logout } = useAuth();

  // Tarefa selecionada para edição (null = modo de criação)
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  return (
    <div className="pagina-tarefas">
      <header className="cabecalho">
        <div className="cabecalho-marca">
          <img src="/icons/icon-192.png" alt="" width="36" height="36" />
          <strong>Minhas Tarefas</strong>
        </div>
        <div className="cabecalho-usuario">
          <span className="usuario-email" title={user.email}>
            {user.email}
          </span>
          <button
            type="button"
            className="botao-neutro"
            onClick={() => logout()}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="conteudo-tarefas">
        <TaskForm
          tarefaEmEdicao={tarefaEmEdicao}
          onCancelarEdicao={() => setTarefaEmEdicao(null)}
        />
        <TaskList onEditar={setTarefaEmEdicao} />
      </main>

      <footer className="rodape">
        <p>Feito com React + Firebase</p>
      </footer>
    </div>
  );
}
