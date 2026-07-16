const p=require('path'),fs=require('fs');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.TK){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials,ChannelType,ButtonStyle}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
const CAT={compras:'🛒 Compras',duvida:'❓ Dúvidas',tec:'🛠️ Suporte Técnico',pg:'💰 Pagamentos',par:'🤝 Parcerias',den:'🚨 Denúncias','adm-contato':'👑 Administração'};
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('messageCreate',async m=>{if(m.author.id!==DONO)return;if(m.content==='!ticket')m.channel.send(CARD('🎫','TICKET','Abra um ticket para receber suporte da nossa equipe.','rosa','ABRIR TICKET','tk.abre'))});
b.on('interactionCreate',async i=>{
  if(i.customId==='tk.abre')return i.reply({content:'Escolha a categoria',components:[],ephemeral:true});
  if(i.isChannelSelectMenu()){}
});
b.on('clientReady',()=>console.log('✅ 07 TICKETS · ONLY SUPPORT AI'));
b.login(C.B.TK.t).catch(e=>console.log(e));
