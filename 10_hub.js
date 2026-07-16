const p=require('path');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.HB){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO)return;
  if(m.content==='!hub'||m.content==='!painel'||m.content==='!ativa'||m.content==='!ativar'){
    await m.channel.send(CARD('🤖','CRIA BOT','Crie um novo bot para o seu servidor.','verde','CRIAR BOT','cria.abre'));
    await m.channel.send(CARD('💻','CRIAR PAINEL','Crie um painel administrativo para gerenciar seu bot.','azul','CRIAR PAINEL','pn.abre'));
    await m.channel.send(CARD('🎫','TICKET','Abra um ticket para receber suporte da nossa equipe.','rosa','ABRIR TICKET','tk.abre'));
    await m.channel.send(CARD('⚙️','ONLY CONTROL','Automação, moderação e organização.','roxo','ABRIR','ctl.menu'));
    await m.channel.send(CARD('👑','ADMIN PANEL','Acesso restrito à equipe.','laranja','ABRIR','adm.menu'));
  }
  if(m.content==='!status')m.reply('🟢 ONLY TECH GOLD v2.6 · 10/10 ONLINE');
});
b.on('clientReady',()=>console.log('✅ 10 HUB · menu completo'));
b.login(C.B.HB.t).catch(e=>console.log(e));
