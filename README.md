# 📝 Gerenciador de Tarefas (PWA)

Aplicação web de gerenciamento de tarefas construída com **React** e
**Firebase**, com autenticação por e-mail/senha, banco de dados em tempo
real (Firestore), hospedagem pública e suporte a **PWA**
(instalável e com funcionamento offline do App Shell).

## 🚀 Funcionalidades

- ✅ Cadastro e login com e-mail/senha (Firebase Authentication)
- ✅ Criar, listar, editar e excluir tarefas (Firestore — CRUD completo)
- ✅ Atualização das tarefas em tempo real (`onSnapshot`)
- ✅ Dados isolados por usuário (Firestore Security Rules)
- ✅ PWA instalável com service worker e cache offline
- ✅ Interface responsiva (mobile-first)

## 🛠️ Tecnologias

| Tecnologia        | Uso                                  |
|-------------------|--------------------------------------|
| React 18 + Vite   | Interface e build                    |
| Firebase SDK v9+  | Autenticação, Firestore e Hosting    |
| CSS               | Estilização                          |
| PWA               | manifest.json + service worker       |

## 📦 Pré-requisitos

- Node.js 18+
- npm
- Conta no [Firebase](https://console.firebase.google.com/)
- Firebase CLI: `npm install -g firebase-tools`

## ⚙️ Instalação e Execução Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/0lzacs0/proj_exp_firebase.git
   cd <repositorio>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um projeto no [Console do Firebase](https://console.firebase.google.com/)
   e ative **Authentication (E-mail/senha)** e **Firestore**.
4. Copie a configuração do app Web e crie um arquivo `.env` na raiz
   (use o `.env.example` como modelo):
   ```env
   VITE_FIREBASE_API_KEY=sua-api-key
   VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-projeto
   VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
   VITE_FIREBASE_APP_ID=seu-app-id
   ```
5. Execute os emuladores locais (recomendado para desenvolvimento):
   ```bash
   firebase emulators:start
   ```
   A aplicação se conecta automaticamente aos emuladores
   (Auth em `:9099` e Firestore em `:8080`) quando executa em `localhost`.
6. Em outro terminal, inicie a aplicação:
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173`.

> 💡 Para testar contra o projeto real mesmo em `localhost`, defina
> `VITE_USE_EMULATORS=false` no arquivo `.env`.

## 🌐 Deploy

1. Substitua o alias do projeto em `.firebaserc` pelo ID do seu projeto
   (ou rode `firebase use --add`).
2. Preencha o `.env` com os dados reais do Console do Firebase.
3. Gere o build e publique:
   ```bash
   npm run build
   firebase login
   firebase deploy
   ```

Aplicação disponível em: **https://proj-exp-firebase.web.app**

## 📁 Estrutura do Projeto

```
├── public/            # manifest.json, sw.js e ícones do PWA
├── src/
│   ├── firebase/      # Configuração do Firebase (SDK modular v9+)
│   ├── context/       # Contexto de autenticação (AuthContext)
│   ├── components/    # Componentes reutilizáveis (formulários e lista)
│   ├── pages/         # Páginas (Login, Cadastro, Tarefas)
│   └── utils/         # Tradução dos erros do Firebase para pt-BR
├── firestore.rules    # Regras de segurança (isolamento por usuário)
└── firebase.json      # Hosting (SPA fallback), emuladores e regras
```

## 🔒 Segurança

As regras do Firestore (`firestore.rules`) garantem que cada usuário
autenticado tenha acesso **apenas às próprias tarefas**. As chaves do
Firebase no `.env` podem ser públicas (padrão do Firebase) — a barreira
real de segurança são as regras.

## 🧪 Testes locais (emuladores)

Com `firebase emulators:start` e `npm run dev` rodando:

1. **Autenticação** — cadastre-se, faça login/logout, recarregue a página
   (a sessão persiste) e tente acessar `/tarefas` sem estar logado
   (redireciona para o login).
2. **CRUD** — crie, edite, marque como concluída e exclua tarefas;
   a lista atualiza em tempo real em duas abas abertas.
3. **Isolamento** — cadastre duas contas e confirme que uma não vê as
   tarefas da outra.
4. **PWA** — no build de produção (`npm run build && npm run preview`),
   verifique em DevTools → Application o manifest e o service worker, e
   recarregue a página no modo offline.

## 📄 Licença

Este projeto está sob a licença MIT.
