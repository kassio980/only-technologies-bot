const {Client,GatewayIntentBits,Partials,PermissionsBitField}=require('discord.js')
const C=require('./_config'),fs=require('fs')
const b=new Client({intents:Object.values(GatewayIntentBits),partials:Object.values(Partials)})
let ID=C.SRV
try{ID=fs.readFileSync(__dirname+'/_servidor.txt','utf8').trim()}catch(e){}
b.on('ready',()=>console.log('✅ 06 SEGURANÇA'))
b.on('messageCreate',m=>{
  if(!m.guild||m.author.bot)return
  if(m.author.id===C.DONO&&m.content.startsWith('!puxap')){ID=m.content.split(' ')[1];fs.writeFileSync(__dirname+'/_servidor.txt',ID);m.reply('✅ ID atualizado em todos')}
  if(m.guild.id!==ID)return m.guild.leave().catch(()=>{})
  if(!m.member.permissions.has(PermissionsBitField.Flags.Administrator)&&(/https?:\/\//i.test(m.content)||m.attachments.size>0)){
    m.delete().catch(()=>{})
  }
})
setInterval(()=>b.guilds.cache.forEach(g=>{if(g.id!==ID)g.leave().catch(()=>{})}),40000)
b.on('guildCreate',g=>{if(g.id!==ID)g.leave().catch(()=>{})})
b.login(C.B.SG.t)
