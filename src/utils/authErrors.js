// Tradução dos códigos de erro do Firebase Authentication para mensagens
// amigáveis em português do Brasil — nunca exibimos o código bruto ao usuário.

// Mapa de códigos do Firebase -> mensagens amigáveis
const MENSAGENS_ERRO = {
  "auth/invalid-email": "Digite um e-mail válido.",
  "auth/missing-password": "Digite a senha.",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  "auth/email-already-in-use":
    "Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/invalid-login-credentials": "E-mail ou senha incorretos.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde alguns instantes e tente novamente.",
  "auth/network-request-failed":
    "Não foi possível conectar ao servidor. Verifique sua conexão ou se os emuladores estão ativos.",
  "auth/operation-not-allowed":
    "O login por e-mail/senha não está ativado no Console do Firebase.",
  "auth/user-disabled": "Esta conta foi desativada.",
};

/**
 * Converte um erro do Firebase Authentication em uma mensagem amigável.
 * @param {object|null} erro Erro lançado pelo SDK (contém a propriedade `code`).
 * @returns {string} Mensagem de erro em português do Brasil.
 */
export function traduzirErroAuth(erro) {
  const codigo = erro?.code ?? "";
  return (
    MENSAGENS_ERRO[codigo] ??
    "Ocorreu um erro inesperado. Tente novamente em instantes."
  );
}
