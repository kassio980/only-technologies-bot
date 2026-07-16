const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const CF=path.join(__dirname,'_config.js'),PORTA=10000;
const BOTS=['01_clonagem.js','02_verificacao.js','03_criador.js','04_tec.js','05_painel.js','06_seguranca.js','07_tickets.js','08_admin.js','09_control.js','10_hub.js'];
const proc=new Map(),queda=new Map();BOTS.forEach(b=>queda.set(b,0));
function e(k,d=''){return process.env[k]||d}
try{if(fs.existsSync(CF))fs.unlinkSync(CF)}catch(_){}
Object.keys(require.cache).forEach(k=>delete require.cache[k]);
const cfg=`globalThis.C={};C.B={
CL:{t:"${e('TOKEN_CLONAGEM','')}"},
VR:{id:"${e('CLIENT_ID','')}",secret:"${e('CLIENT_SECRET','')}",cargo:"${e('CARGO_VERIF','')}",servidor:"${e('SERVIDOR_ID','')}",t:"${e('TOKEN_VERIFICACAO','')}"},
REDIRECT:"${e('REDIRECT_URI','https://only-technologies-bot-1.onrender.com/auth')}",
CB:{t:"${e('TOKEN_CRIADOR','')}"},CR:{t:"${e('TOKEN_CRIADOR','')}"},
TC:{t:"${e('TOKEN_TECNICO','')}"},PN:{t:"${e('TOKEN_PAINEL','')}"},
SG:{t:"${e('TOKEN_SEGURANCA','')}"},TK:{t:"${e('TOKEN_TICKET','')}"},
AD:{t:"${e('TOKEN_ADMIN','')}"},CT:{t:"${e('TOKEN_CONTROL','')}"},
HB:{t:"${e('TOKEN_HUB','')}"},
SV:{dono:"${e('DONO_ID','')}",servidor:"${e('SERVIDOR_ID','')}"}
};Object.freeze(C.B);module.exports=C;`;
fs.writeFileSync(CF,cfg.trim(),'utf8');
let t=0;while(t<15){try{delete require.cache[require.resolve(CF)];globalThis.C=require(CF);if(C?.B?.VR&&C?.B?.REDIRECT&&C?.B?.CB&&C?.B?.SV)break}catch(_){}t++;require('child_process').execSync('sleep 0.2')}
if(!C?.B){console.error('❌ C.B NAO MONTADO');process.exit(1)}
console.log('✅ SUPERVISOR | C.B 100% | TODAS CHAVES EXISTEM');
require('http').createServer((_,r)=>{const v=[...proc.values()].filter(p=>!p.killed).length;r.writeHead(200,{'Content-Type':'application/json'});r.end(JSON.stringify({status:'ONLINE',sistema:'ONLY TECH GOLD v2.6',bots:`${v}/10`,ram_mb:Math.round(process.memoryUsage().rss/1048576),uptime:Math.floor(process.uptime())}))}).listen(PORTA);
function ligar(f){const p=spawn('node',[path.join(__dirname,f)],{stdio:'inherit'});proc.set(f,p);console.log(`✅ ${f} PID=${p.pid}`);p.on('close',c=>{queda.set(f,queda.get(f)+1);console.log(`⚠️ ${f} caiu ${c}`);setTimeout(()=>ligar(f),Math.min(1500+queda.get(f)*800,8000))})}
BOTS.forEach((b,i)=>setTimeout(()=>ligar(b),i*2200));
setInterval(()=>{const v=[...proc.values()].filter(p=>!p.killed).length,ram=Math.round(process.memoryUsage().rss/1048576);console.log(`📊 ${v}/10 | RAM ${ram}MB`);if(ram>460){try{proc.get('10_hub.js').kill()}catch(_){}setTimeout(()=>ligar('10_hub.js'),1500)}},20000);
