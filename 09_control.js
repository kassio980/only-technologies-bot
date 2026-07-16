const p=require('path');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.CT){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('guildMemberAdd',async m=>{if(m.guild.id!==SRV)return;const c=m.guild.channels.cache.find(x=>x.name.includes('bem-vindo')||x.name.includes('entrada'));c?.send(`🎉 Bem-vindo ao ONLY TECHNOLOGIES!\nAqui você encontra os melhores sistemas de bots para Discord, com qualidade, segurança e inovação. Aproveite nossos serviços e tenha uma ótima experiência em nossa comunidade!`)})
b.on('guildMemberRemove',async m=>{if(m.guild.id!==SRV)return;const c=m.guild.channels.cache.find(x=>x.name.includes('saída')||x.name.includes('saida'));c?.send(`👋 Você saiu do ONLY TECHNOLOGIES.\nSentiremos sua falta. Estamos sempre melhorando nossos sistemas e esperamos que um dia você volte para conferir todas as novidades!`)})
b.on('messageCreate',async m=>{if(m.author.id!==DONO)return;if(m.content==='!control'||m.content==='!CONTROLE')m.channel.send(CARD('⚙️','ONLY CONTROL','Gerencie tudo em um só lugar.','roxo','ABRIR CONTROLE','ctl.menu'))});
b.on('clientReady',()=>console.log('✅ 09 CONTROL · ONLY CONTROL completo'));
b.login(C.B.CT.t).catch(e=>console.log(e));
