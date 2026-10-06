// Lista de tarefas em tempo real (onSnapshot) da subcoleção do usuário
// logado, com estados de carregamento, erro e aviso offline (PWA).
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import TaskItem from "./TaskItem";

export default function TaskList({ onEditar }) {
  const { user } = useAuth();
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  // Detecta mudanças de conexão para exibir o aviso offline (PWA)
  useEffect(() => {
    const marcarOnline = () => setOnline(true);
    const marcarOffline = () => setOnline(false);
    window.addEventListener("online", marcarOnline);
    window.addEventListener("offline", marcarOffline);
    return () => {
      window.removeEventListener("online", marcarOnline);
      window.removeEventListener("offline", marcarOffline);
    };
  }, []);

  // Escuta em tempo real as tarefas do usuário (ordenadas da mais recente
  // para a mais antiga) e cancela a inscrição ao desmontar
  useEffect(() => {
    const consulta = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    );
    const cancelar = onSnapshot(
      consulta,
      (snapshot) => {
        setTarefas(
          snapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data(),
          }))
        );
        setCarregando(false);
        setErro("");
      },
      (erroSnapshot) => {
        console.error("Falha ao escutar as tarefas:", erroSnapshot);
        setErro("Não foi possível carregar suas tarefas. Verifique sua conexão.");
        setCarregando(false);
      }
    );
    return cancelar;
  }, [user.uid]);

  if (carregando) {
    return <p className="estado-lista">Carregando tarefas…</p>;
  }

  if (erro) {
    return (
      <p className="mensagem-erro" role="alert">
        {erro}
      </p>
    );
  }

  return (
    <div className="lista-tarefas">
      {!online && (
        <p className="aviso-offline" role="status">
          Você está offline. Suas tarefas aparecerão quando a conexão voltar.
        </p>
      )}
      {tarefas.length === 0 ? (
        <p className="estado-lista">
          Nenhuma tarefa por aqui. Adicione a primeira acima! 🎉
        </p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <TaskItem key={tarefa.id} tarefa={tarefa} onEditar={onEditar} />
          ))}
        </ul>
      )}
    </div>
  );
}
