// Item de tarefa: alterna o estado "concluída", dispara a edição
// (delegada à página Tasks) e exclui a tarefa após confirmação.
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function TaskItem({ tarefa, onEditar }) {
  const { user } = useAuth();

  // Alterna o estado "concluída" da tarefa
  async function alternarConcluida() {
    try {
      await updateDoc(doc(db, "users", user.uid, "tasks", tarefa.id), {
        done: !tarefa.done,
      });
    } catch (erro) {
      console.error("Falha ao atualizar a tarefa:", erro);
    }
  }

  // Exclui a tarefa após confirmação do usuário
  async function excluir() {
    if (!window.confirm("Excluir esta tarefa?")) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "tasks", tarefa.id));
    } catch (erro) {
      console.error("Falha ao excluir a tarefa:", erro);
    }
  }

  return (
    <li className={tarefa.done ? "tarefa concluida" : "tarefa"}>
      <label className="tarefa-conteudo">
        <input
          type="checkbox"
          checked={Boolean(tarefa.done)}
          onChange={alternarConcluida}
        />
        <span className="tarefa-titulo">{tarefa.title}</span>
      </label>
      <div className="tarefa-acoes">
        <button
          type="button"
          className="botao-acao"
          onClick={() => onEditar(tarefa)}
        >
          Editar
        </button>
        <button
          type="button"
          className="botao-acao perigo"
          onClick={excluir}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
