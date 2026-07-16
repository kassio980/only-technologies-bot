const p=require('path');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.AD){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials,PermissionsBitField}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO && !m.member?.permissions.has(PermissionsBitField.Flags.Administrator))return;
  if(m.content==='!paineladm'||m.content==='!admin')m.channel.send(CARD('👑','ONLY ADMIN PANEL','Centro de administração completo · só para equipe.','laranja','ABRIR PAINEL','adm.menu'))
});
b.on('clientReady',()=>console.log('✅ 08 ADMIN · ONLY ADMIN PANEL'));
b.login(C.B.AD.t).catch(e=>console.log(e));
