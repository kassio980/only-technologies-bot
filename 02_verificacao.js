const {Client,GatewayIntentBits,Partials,ButtonBuilder,ButtonStyle,ActionRowBuilder,EmbedBuilder}=require('discord.js')
const C=require('./_config'),CRD=require('./_card')
const b=new Client({intents:Object.values(GatewayIntentBits),partials:Object.values(Partials)})
const O=`https://discord.com/api/oauth2/authorize?client_id=${C.B.VR.id}&redirect_uri=${encodeURIComponent(C.REDIRECT)}&response_type=code&scope=${encodeURIComponent(C.SV)}&prompt=consent`
b.on('ready',()=>console.log('✅ 02 VERIFICAÇÃO'))
b.on('messageCreate',m=>{
  if(/^!(veri|verificar)$/i.test(m.content)){
    m.channel.send({
      embeds:[new EmbedBuilder().setColor('#00e0ff').setAuthor({name:'ONLY SECURITY',iconURL:C.LOGO})
        .setThumbnail('https://i.imgur.com/kZpXQ6Y.png')
        .setTitle('🛡️  VERIFICA‑SE')
        .setDescription('Confirme sua identidade oficial Discord para receber acesso completo.')],
      components:[new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('🛡️ VERIFICAR').setURL(O).setStyle(ButtonStyle.Link))]
    })
  }
})
b.on('guildMemberAdd',async mm=>{
  if(mm.guild.id!==C.SRV||mm.user.bot)return
  try{await mm.roles.add(C.CARGO_VERIF);mm.send({embeds:[new EmbedBuilder().setColor('#00e0ff').setTitle('✅ VERIFICADO').setDescription(`Acesso liberado → https://discord.com/channels/${C.SRV}`)]}).catch(()=>{})}catch(e){}
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.VR.t)
