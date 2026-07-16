const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = __dirname;
console.log("\x1b[36m[BOOT] 📂 Pasta raiz:", ROOT, "\x1b[0m");

console.log("\x1b[36m[BOOT] 📁 Arquivos carregados:\x1b[0m");
try { fs.readdirSync(ROOT).filter(f=>f.endsWith(".js")).forEach(f=>console.log("   -",f)); } catch(e){}

// ==============================================
// 🤖 _config.js COM ESTRUTURA EXATA QUE SEUS BOTS PRECISAM
// ==============================================
const CFG_REAL = path.join(ROOT,"_config.js");
const CRD = path.join(ROOT,"_card.js");

if (!fs.existsSync(CFG_REAL)) {
  const cfgFinal = `module.exports = {
  DONO_ID: process.env.DONO_ID || "",
  SERVIDOR_ID: process.env.SERVIDOR_ID || "",
  CARGO_VERIF: process.env.CARGO_VERIF || "",
  VERSAO: "2.6.0",
  PREFIX: "!",
  // 🔑 ESTRUTURA EXATA QUE SEUS BOTS USAM — NENHUM ERRO MAIS
  B: {
    VR: { id: process.env.CLIENT_ID || "", segredo: process.env.CLIENT_SECRET || "", t: process.env.TOKEN_VERIFICACAO || "" },
    REDIRECT: process.env.REDIRECT_URI || "",
    SV: "identify%20guilds%20email%20messages%20members",
    CL: { t: process.env.TOKEN_CLONAGEM || "" },
    CR: { t: process.env.TOKEN_CRIADOR || "" },
    TC: { t: process.env.TOKEN_TECNICO || "" },
    PN: { t: process.env.TOKEN_PAINEL || "" },
    SG: { t: process.env.TOKEN_SEGURANCA || "" },
    TK: { t: process.env.TOKEN_TICKET || "" },
    AD: { t: process.env.TOKEN_ADMIN || "" },
    CT: { t: process.env.TOKEN_CONTROL || "" },
    HB: { t: process.env.TOKEN_HUB || "" },
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
};`;
  fs.writeFileSync(CFG_REAL, cfgFinal + "\n");
  console.log("\x1b[32m[BOOT] ✅ _config.js CRIADO COM ESTRUTURA EXATA DOS BOTS\x1b[0m");
}

if(!fs.existsSync(CRD)) fs.writeFileSync(CRD, "module.exports = {};\n");

const BOTS = ["10_hub.js","01_clonagem.js","02_verificacao.js","03_criador.js","04_tec.js","05_painel.js","06_seguranca.js","07_tickets.js","08_admin.js","09_control.js"]
  .map(n=>({nome:n,abs:path.join(ROOT,n)}));

console.log("\x1b[36m[BOOT] 🔍 Verificando bots:\x1b[0m");
BOTS.forEach(b=>console.log(`   ${fs.existsSync(b.abs)?"✅":"❌"} ${b.nome}`));

const C = { DELAY:1800, REL:1500, LENTO:7000, STATUS:20000, RAM:460,
  PORTA:process.env.PORT||10000, LOG:path.join(ROOT,".supervisor.log") };
const M = new Map();
let LS; try{LS=fs.createWriteStream(C.LOG,{flags:"a"})}catch(e){}
const L=(t,m)=>{const l=`[${new Date().toLocaleString("pt-BR")}] [${t}] ${m}`;console.log(l);try{if(LS)LS.write(l+"\n")}catch(e){}};

http.createServer((_,r)=>{try{const v=[...M.values()].filter(x=>x.p&&!x.p.killed).length;r.writeHead(200,{"Content-Type":"application/json"});r.end(JSON.stringify({status:"ONLINE",sistema:"ONLY TECH v2.6",autor:"Santos Lima Raquel",bots:`${v}/${BOTS.length}`,ram_mb:Math.round(process.memoryUsage().rss/1048576),up:Math.floor(process.uptime())}))}catch(e){r.writeHead(500);r.end("ERRO")}}).listen(C.PORTA,()=>L("SYS",`🩺 Health OK ${C.PORTA}`));

const ligar=(b)=>{
  try{
    const a=M.get(b.nome);if(a?.p&&!a.p.killed)return;
    if(!fs.existsSync(b.abs)){L("ERRO",`❌ ${b.nome} não encontrado — tentando em 3s`);setTimeout(()=>ligar(b),3000);return;}
    const p=spawn("node",[b.abs],{cwd:ROOT,stdio:"inherit",env:{...process.env}});
    const d={p,quedas:a?.quedas||0};M.set(b.nome,d);
    L("OK",`✅ ${b.nome} LIGADO PID=${p.pid} quedas=${d.quedas}`);
    p.on("close",c=>{d.quedas++;L("AVISO",`⚠️  ${b.nome} CAIU code=${c} quedas=${d.quedas}`);setTimeout(()=>ligar(b),d.quedas>=5?C.LENTO:C.REL)});
    p.on("error",e=>{L("ERRO",`❌ ${b.nome}: ${e.message}`);setTimeout(()=>ligar(b),3000)});
  }catch(e){L("ERRO",`❌ Falha ${b.nome}: ${e.message}`);setTimeout(()=>ligar(b),4000)}
};

setInterval(()=>{const r=Math.round(process.memoryUsage().rss/1048576);if(r>=C.RAM){L("AVISO",`🧠 RAM ${r}MB — reinicia HUB`);try{M.get("10_hub.js")?.p?.kill("SIGTERM")}catch(e){}}},10000);
setInterval(()=>{const v=[...M.values()].filter(x=>x.p&&!x.p.killed).length;L("SYS",`📊 ${v}/${BOTS.length} VIVOS | RAM ${Math.round(process.memoryUsage().rss/1048576)}MB`)},C.STATUS);
process.on("uncaughtException",e=>L("ERRO",`🛑 SUP: ${e.message}`));
process.on("unhandledRejection",e=>L("ERRO",`⚠️  SUP: ${e?.message||e}`));
process.on("SIGTERM",()=>{L("SYS","🛑 Saindo");M.forEach(x=>{try{x.p?.kill()}catch(e){}});setTimeout(()=>process.exit(0),1500)});

L("SYS","=".repeat(50));
L("SYS","🏆 SUPERVISOR v2.6 — SINTAXE _estilo CORRIGIDA + ESTRUTURA EXATA");
L("SYS","👤 Santos Lima Raquel");
L("SYS","=".repeat(50));
BOTS.forEach((b,i)=>setTimeout(()=>ligar(b),i*C.DELAY));
