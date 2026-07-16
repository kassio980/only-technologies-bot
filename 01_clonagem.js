const {Client,GatewayIntentBits,ModalBuilder,TextInputBuilder,ActionRowBuilder,TextInputStyle,Partials}=require('discord.js')
const C=require('./_config'),{EMB}=require('./_estilo'),fs=require('fs'),ax=require('axios')
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Partials.Message,Partials.Channel,Partials.GuildMember]})
const db={lim:{}}
b.on('ready',()=>console.log('✅ 01'))
b.on('messageCreate',async m=>{
  if(m.content==='!clonar'||m.content==='!clona') m.channel.send(EMB('CL',C.B.CL.n))
  if(m.content.startsWith('!add')&&m.author.id===C.DONO){const [,q,id]=m.content.split(' ');db.lim[id]=(db.lim[id]||0)+Number(q||0);m.reply('✅ ok')}
})
b.on('interactionCreate',async i=>{
  if(i.customId==='btn_CL'){
    const md=new ModalBuilder().setCustomId('mdc').setTitle('🔁 CLONAR')
    md.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tk').setLabel('TOKEN CONTA').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('sid').setLabel('ID').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('lk').setLabel('LINK').setStyle(1).setRequired(true)))
    i.showModal(md)
  }
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.CL.t)
