// 📋 MODELO — NENHUM TOKEN AQUI!
// Preencha as variáveis de ambiente no Render com seus dados
module.exports = {
  DONO_ID: process.env.DONO_ID || "",
  SERVIDOR_ID: process.env.SERVIDOR_ID || "",
  CARGO_VERIF: process.env.CARGO_VERIF || "",
  VERSAO: "2.5.0",
  PREFIX: "!",
  B: {
    VR: { id: process.env.CLIENT_ID || "", segredo: process.env.CLIENT_SECRET || "" },
    REDIRECT: process.env.REDIRECT_URI || "",
    SV: "identify%20guilds%20email%20messages%20members",
    CANAIS: {},
    CARGOS: {}
  },
  TOKENS: {
    CLONAGEM: process.env.TOKEN_CLONAGEM || "",
    VERIFICACAO: process.env.TOKEN_VERIFICACAO || "",
    CRIADOR: process.env.TOKEN_CRIADOR || "",
    TECNICO: process.env.TOKEN_TECNICO || "",
    PAINEL: process.env.TOKEN_PAINEL || "",
    SEGURANCA: process.env.TOKEN_SEGURANCA || "",
    TICKET: process.env.TOKEN_TICKET || "",
    ADMIN: process.env.TOKEN_ADMIN || "",
    CONTROL: process.env.TOKEN_CONTROL || "",
    HUB: process.env.TOKEN_HUB || ""
  },
  CORES: {
    CLONAGEM:"#39ff14",VERIFICACAO:"#00e0ff",CRIADOR:"#00ff41",
    TECNICO:"#ff9500",PAINEL:"#00a6ff",SEGURANCA:"#ff2d2d",
    TICKET:"#ff3fa0",ADMIN:"#b14bff",CONTROL:"#39ff14",HUB:"#00d4ff"
  }
};
