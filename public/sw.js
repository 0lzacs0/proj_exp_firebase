/**
 * Service Worker do Gerenciador de Tarefas.
 * Estratégia cache-first para o App Shell: a interface funciona offline e os
 * recursos estáticos são servidos primeiro do cache, buscando na rede apenas
 * quando não houver cópia local. Requisições do Firebase (domínios externos e
 * portas dos emuladores) nunca são interceptadas.
 */

// Nome do cache (bump na versão para forçar atualização do App Shell)
const NOME_CACHE = "tarefas-app-shell-v1";

// Recursos do App Shell pré-cacheados na instalação
const RECURSOS_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Instalação: pré-cacheia o App Shell e ativa o mais rápido possível.
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(NOME_CACHE).then((cache) => cache.addAll(RECURSOS_SHELL))
  );
  self.skipWaiting();
});

// Ativação: remove caches de versões antigas e assume as abas abertas.
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nomes) =>
        Promise.all(
          nomes
            .filter((nome) => nome !== NOME_CACHE)
            .map((nome) => caches.delete(nome))
        )
      )
  );
  self.clients.claim();
});

// Busca: cache-first para GETs de mesma origem; navegações caem no
// index.html em cache para que o shell funcione offline.
self.addEventListener("fetch", (evento) => {
  const requisicao = evento.request;

  // Ignora anything que não seja GET de mesma origem (APIs do Firebase,
  // emuladores em outras portas, etc. não passam por aqui)
  if (
    requisicao.method !== "GET" ||
    new URL(requisicao.url).origin !== self.location.origin
  ) {
    return;
  }

  // Navegações: entrega o shell em cache; se não houver, vai à rede.
  if (requisicao.mode === "navigate") {
    evento.respondWith(
      caches
        .match("/index.html")
        .then((respostaEmCache) => respostaEmCache || fetch(requisicao))
    );
    return;
  }

  // Demais recursos estáticos: cache-first com preenchimento em runtime.
  evento.respondWith(
    caches.match(requisicao).then(
      (respostaEmCache) =>
        respostaEmCache ||
        fetch(requisicao).then((respostaRede) => {
          // Armazena em runtime apenas respostas bem-sucedidas
          if (respostaRede && respostaRede.ok) {
            const copia = respostaRede.clone();
            caches.open(NOME_CACHE).then((cache) => cache.put(requisicao, copia));
          }
          return respostaRede;
        })
    )
  );
});
