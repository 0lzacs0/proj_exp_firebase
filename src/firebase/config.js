// Importa as funções necessárias do SDK modular do Firebase (v9+)
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// Configuração do projeto Firebase (valores do console do Firebase)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação
export const auth = getAuth(app);

// Inicializa o Firestore com cache persistente (IndexedDB): os dados
// sobrevivem ao recarregamento da página e permitem uso offline do app.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Conecta aos emuladores locais quando a aplicação roda em localhost,
// permitindo desenvolvimento e testes sem tocar no projeto real.
// Para usar o projeto real mesmo em localhost, defina VITE_USE_EMULATORS=false.
if (
  typeof window !== "undefined" &&
  window.location.hostname === "localhost" &&
  import.meta.env.VITE_USE_EMULATORS !== "false"
) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
