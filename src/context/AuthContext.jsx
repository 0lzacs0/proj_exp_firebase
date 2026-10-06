// Contexto global de autenticação: expõe o usuário atual, o estado de
// carregamento e as ações de cadastro, login e logout para toda a aplicação.
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

// Contexto criado sem valor padrão: o uso fora do provedor é um erro de programa
const AuthContext = createContext(null);

/**
 * Provedor do contexto de autenticação.
 * Observa o estado da sessão (onAuthStateChanged), garantindo persistência
 * entre recarregamentos da página.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observa mudanças no estado de autenticação e cancela a inscrição ao desmontar
  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoading(false);
    });
    return cancelar;
  }, []);

  // Cadastra um novo usuário com e-mail e senha
  const register = (email, senha) =>
    createUserWithEmailAndPassword(auth, email, senha);

  // Autentica um usuário já cadastrado
  const login = (email, senha) =>
    signInWithEmailAndPassword(auth, email, senha);

  // Encerra a sessão do usuário atual
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook de acesso ao contexto de autenticação.
 * @returns {{ user: object|null, loading: boolean, register: Function, login: Function, logout: Function }}
 */
export function useAuth() {
  return useContext(AuthContext);
}
