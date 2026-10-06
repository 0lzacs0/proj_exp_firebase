import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração do Vite com o plugin do React.
// O proxy não é necessário: em desenvolvimento a aplicação se conecta
// diretamente aos emuladores do Firebase (Auth :9099 e Firestore :8080).
export default defineConfig({
  plugins: [react()],
});
