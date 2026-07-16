const fs=require('fs'),{execSync,spawn}=require('child_process');
const LOG='./.logs_ocultos/supervisor.log';
const APPS=['01_CLONAGEM','02_VERIFICAÇÃO','03_CRIADOR','04_TEC','05_PAINEL','06_SEGURANÇA'];
const ARQS={'01_CLONAGEM':'01_clonagem.js','02_VERIFICAÇÃO':'02_verificacao.js','03_CRIADOR':'03_criador.js','04_TEC':'04_tec.js','05_PAINEL':'05_painel.js','06_SEGURANÇA':'06_seguranca.js'};
const w=t=>{try{fs.appendFileSync(LOG,`[${new Date().toISOString()}] ${t}\n`)}catch{}};
function status(){try{return JSON.parse(execSync('pm2 jlist 2>/dev/null').toString())}catch{return[]}}
function liga(nome,arq){try{execSync(`pm2 start ${arq} --name "${nome}" --autorestart --max-restarts 99999 -f >/dev/null 2>&1`);w(`🔄 LIGOU ${nome}`)}catch(e){w(`❌ ${nome}:${e.message}`)}}
function consertaAuto(){try{execSync('npm i --silent >/dev/null 2>&1;termux-wake-lock -q 2>/dev/null')}catch{}}
setInterval(()=>{
  const s=status();
  for(const n of APPS){
    const p=s.find(x=>x.name===n);
    if(!p||p.pm2_env.status!=='online'){
      consertaAuto();
      liga(n,ARQS[n]);
    }
  }
},1); // ← 1 MILISEGUNDO
w('✅ SUPERVISOR 1MS INICIADO');
