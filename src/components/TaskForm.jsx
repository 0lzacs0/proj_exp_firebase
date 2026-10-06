// Formulário de tarefas: cria novas tarefas e conclui a edição de uma
// tarefa existente (o modo edição é controlado pela página Tasks).
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

// Tamanho máximo do título de uma tarefa
const TITULO_MAXIMO = 120;

export default function TaskForm({ tarefaEmEdicao, onCancelarEdicao }) {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const editando = Boolean(tarefaEmEdicao);

  // Ao entrar em modo de edição, preenche o campo com o título atual
  useEffect(() => {
    setTitulo(editando ? tarefaEmEdicao.title : "");
    setErro("");
  }, [tarefaEmEdicao, editando]);

  // Cria ou atualiza a tarefa conforme o modo do formulário
  async function aoEnviar(evento) {
    evento.preventDefault();
    const tituloLimpo = titulo.trim();
    if (!tituloLimpo) {
      setErro("Descreva a tarefa antes de salvar.");
      return;
    }
    setErro("");
    setEnviando(true);
    try {
      if (editando) {
        // Atualiza o título da tarefa em edição
        await updateDoc(
          doc(db, "users", user.uid, "tasks", tarefaEmEdicao.id),
          { title: tituloLimpo }
        );
        onCancelarEdicao();
      } else {
        // Cria uma nova tarefa vinculada ao usuário logado
        await addDoc(collection(db, "users", user.uid, "tasks"), {
          title: tituloLimpo,
          done: false,
          createdAt: serverTimestamp(),
        });
        setTitulo("");
      }
    } catch (erroFirebase) {
      console.error("Falha ao salvar a tarefa:", erroFirebase);
      setErro("Não foi possível salvar a tarefa. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="form-tarefa" onSubmit={aoEnviar} noValidate>
      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}
      <div className="linha-form-tarefa">
        <input
          type="text"
          value={titulo}
          maxLength={TITULO_MAXIMO}
          placeholder={editando ? "Edite a tarefa…" : "Nova tarefa…"}
          aria-label="Título da tarefa"
          onChange={(evento) => setTitulo(evento.target.value)}
        />
        <button
          type="submit"
          className="botao-primario"
          disabled={enviando}
        >
          {enviando ? "Salvando…" : editando ? "Salvar" : "Adicionar"}
        </button>
        {editando && (
          <button
            type="button"
            className="botao-neutro"
            onClick={onCancelarEdicao}
            disabled={enviando}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
