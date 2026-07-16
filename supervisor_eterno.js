const fs=require('fs'),{execSync}=require('child_process');
const APPS=['01_CLONAGEM','02_VERIFICAÇÃO','03_CRIADOR','04_TEC','05_PAINEL','06_SEGURANÇA'];
setInterval(()=>{
  try{
    const s=JSON.parse(execSync('pm2 jlist').toString());
    for(const n of APPS){
      const p=s.find(x=>x.name===n);
      if(!p||p.pm2_env.status!=='online') execSync(`pm2 start ecosystem.config.js --only ${n} -f >/dev/null 2>&1`);
    }
    execSync('termux-wake-lock -q >/dev/null 2>&1').toString();
  }catch{}
},1);
