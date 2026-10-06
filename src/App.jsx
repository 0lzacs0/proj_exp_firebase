// Definição das rotas da aplicação com proteção de acesso:
// - telas privadas redirecionam para o login quando não há sessão;
// - telas públicas (login/cadastro) redirecionam para as tarefas com sessão ativa.
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

// Tela de carregamento exibida enquanto o estado de autenticação é verificado,
// evitando tremulação de rotas ao recarregar a página
function TelaCarregando() {
  return (
    <div className="tela-carregando" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>Carregando…</p>
    </div>
  );
}

// Envolve rotas exclusivas de usuários autenticados
function RotaProtegida({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <TelaCarregando />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Envolve rotas exclusivas de visitantes (login e cadastro)
function RotaPublica({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <TelaCarregando />;
  if (user) return <Navigate to="/tarefas" replace />;
  return children;
}

// Rota raiz: direciona para tarefas ou login conforme a sessão
function Raiz() {
  const { user, loading } = useAuth();
  if (loading) return <TelaCarregando />;
  return <Navigate to={user ? "/tarefas" : "/login"} replace />;
}

// Componente raiz com o mapa de rotas da aplicação
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Raiz />} />
      <Route
        path="/login"
        element={
          <RotaPublica>
            <Login />
          </RotaPublica>
        }
      />
      <Route
        path="/cadastro"
        element={
          <RotaPublica>
            <Register />
          </RotaPublica>
        }
      />
      <Route
        path="/tarefas"
        element={
          <RotaProtegida>
            <Tasks />
          </RotaProtegida>
        }
      />
      {/* Qualquer rota desconhecida volta para a raiz */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
