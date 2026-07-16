const {Client,GatewayIntentBits,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder,PermissionFlagsBits,Partials}=require('discord.js')
const C=require('./_config'),{EMB}=require('./_estilo'),cp=require('child_process')
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Partials.Message]})
function ADM(m){return m?.permissions?.has(PermissionFlagsBits.Administrator)||m?.id===C.DONO}
b.on('ready',()=>console.log('✅ 08'))
b.on('messageCreate',m=>{if(m.content==='!painel'){const e=EMB('AD',C.B.AD.n);e.embeds[0].setDescription('> Apenas administradores podem usar.');m.channel.send(e)}})
b.on('interactionCreate',async i=>{
  if(i.customId==='btn_AD'){
    if(!ADM(i.member)) return i.reply({embeds:[new EmbedBuilder().setColor('#ff2b2b').setDescription('🔒 só admin')],ephemeral:true})
    let o=''
    try{o=cp.execSync('pm2 status -s','utf8')}catch(e){o='—'}
    i.reply({embeds:[new EmbedBuilder().setColor('#7c3aed').setTitle('👑 ADMIN').setDescription('```\n'+o.slice(0,1900)+'\n```')],ephemeral:true})
  }
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.AD.t)
