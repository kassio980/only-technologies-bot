const {Client,GatewayIntentBits,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,ChannelType,PermissionFlagsBits,Partials}=require('discord.js')
const C=require('./_config'),{EMB}=require('./_estilo'),fs=require('fs')
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Partials.Message,Partials.Channel]})
const DB=__dirname+'/.tk.json',db=fs.existsSync(DB)?JSON.parse(fs.readFileSync(DB)):{abertos:[],contadores:{abertos:0,fechados:0}}
function sv(){fs.writeFileSync(DB,JSON.stringify(db,null,2))}
const CAT=[
  {id:'cl',e:'🤖',n:'Clonagem',c:'#00ff3c'},{id:'bt',e:'⚙️',n:'Criar Bot',c:'#009dff'},
  {id:'pn',e:'🖥️',n:'Painel',c:'#00e5ff'},{id:'ad',e:'👑',n:'ADM',c:'#7c3aed',md:true},
  {id:'aj',e:'🛠️',n:'Ajudante',c:'#7c3aed',md:true},{id:'pg',e:'💰',n:'Compras',c:'#ffd60a'},
  {id:'bg',e:'🐞',n:'Bug',c:'#ff2b2b'},{id:'sg',e:'💡',n:'Sugestão',c:'#8bc34a'}
]
b.on('ready',()=>console.log('✅ 07'))
b.on('messageCreate',async m=>{
  if(m.content==='!ticket'){
    const e=EMB('TK',C.B.TK.n)
    const rows=[]
    for(let k=0;k<CAT.length;k+=2) rows.push(new ActionRowBuilder().addComponents(CAT.slice(k,k+2).map(c=>new ButtonBuilder().setCustomId('c_'+c.id).setLabel(c.n).setEmoji(c.e).setStyle(ButtonStyle.Success))))
    e.components=rows
    m.channel.send(e)
  }
})
b.on('interactionCreate',async i=>{
  if(i.customId.startsWith('c_')){
    const c=CAT.find(x=>x.id===i.customId.slice(2))
    if(c.md){
      const md=new ModalBuilder().setCustomId('f_'+c.id).setTitle('FORMULÁRIO')
      md.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('a').setLabel('Nome').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('b').setLabel('Idade').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('c').setLabel('Tempo').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('d').setLabel('Experiência').setStyle(2).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('e').setLabel('Motivo').setStyle(2).setRequired(true)))
      return i.showModal(md)
    }
    const ch=await i.guild.channels.create({name:`ticket‑${c.id}‑${i.user.username}`,type:ChannelType.GuildText,permissionOverwrites:[{id:i.guild.id,deny:[PermissionFlagsBits.ViewChannel]},{id:i.user.id,allow:['ViewChannel','SendMessages']}]})
    db.abertos.push({id:Date.now(),user:i.user.id,cat:c.id,canal:ch.id});db.contadores.abertos++;sv()
    ch.send({embeds:[new EmbedBuilder().setColor('#ff2bd6').setTitle('🎟️ ATENDIMENTO ABERTO').setDescription(`👤 <@${i.user.id}>`)],components:[new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('fc').setLabel('🔒 FECHAR').setStyle(ButtonStyle.Danger))]})
    i.reply({embeds:[new EmbedBuilder().setColor('#ff2bd6').setDescription(`✅ <#${ch.id}>`)],ephemeral:true})
  }
  if(i.customId==='fc'){db.contadores.abertos--;db.contadores.fechados++;sv();i.reply('🔒 FECHADO');i.channel.permissionOverwrites.edit(i.user.id,{SendMessages:false})}
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.TK.t)
