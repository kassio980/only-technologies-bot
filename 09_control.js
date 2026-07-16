const {Client,GatewayIntentBits,Partials,ActionRowBuilder,ButtonBuilder,EmbedBuilder,PermissionFlagsBits}=require('discord.js')
const C=require('./_config'),CRD=require('./_card'),fs=require('fs')
const b=new Client({intents:Object.values(GatewayIntentBits),partials:Object.values(Partials)})
const DB=__dirname+'/.ctrl.json'
const d=fs.existsSync(DB)?JSON.parse(fs.readFileSync(DB)):{
  mod:{bemvindo:true,saida:true,automod:true,estat:true,logs:true,recomp:true,cargos:true,anuncios:true,agenda:true,backup:true},
  logs:[],proibidas:['spam','palavrao','linkcurto']
}
function sv(){fs.writeFileSync(DB,JSON.stringify(d,null,2))}
function lg(a,u,x=''){d.logs.unshift({t:Date.now(),a,u:`${u?.tag||'sistema'}`,x});if(d.logs.length>200)d.logs.pop();sv()}

b.on('ready',()=>console.log('✅ 09 ONLY CONTROL'))
b.on('guildMemberAdd',async mm=>{
  if(mm.guild.id!==C.SRV||mm.user.bot)return
  lg('ENTRADA',mm.user)
  if(d.mod.bemvindo){
    const ch=mm.guild.channels.cache.find(c=>/boas|welcome|bem/i.test(c.name))||mm.guild.systemChannel
    ch?.send({embeds:[new EmbedBuilder().setColor('#39ff14').setAuthor({name:'ONLY TECHNOLOGIES',iconURL:C.LOGO})
      .setTitle('🎉 Bem‑vindo ao ONLY TECHNOLOGIES!')
      .setDescription('Aqui você encontra os melhores sistemas de bots para Discord, com qualidade, segurança e inovação.')
      .setThumbnail(mm.user.displayAvatarURL({size:512,dynamic:true})).setTimestamp()]
    }).catch(()=>{})
  }
})
b.on('guildMemberRemove',mm=>{
  if(mm.guild.id!==C.SRV||mm.user.bot)return
  lg('SAÍDA',mm.user)
  if(d.mod.saida){
    const ch=mm.guild.channels.cache.find(c=>/sa[ií]da|exit|bye/i.test(c.name))||mm.guild.systemChannel
    ch?.send({embeds:[new EmbedBuilder().setColor('#ff3b3b').setTitle('👋 Você saiu do ONLY TECHNOLOGIES.').setDescription('Sentiremos sua falta. Estamos sempre melhorando nossos sistemas.')]}).catch(()=>{})
  }
})
const cd=new Map()
b.on('messageCreate',m=>{
  if(!m.guild||m.author.bot)return
  if(d.mod.automod&&!m.member.permissions.has(PermissionFlagsBits.Administrator)){
    if(d.proibidas.some(p=>m.content.toLowerCase().includes(p))||/https?:\/\//i.test(m.content)){m.delete().catch(()=>{});lg('AUTOMOD',m.author,m.content)}
    const x=cd.get(m.author.id)||[];x.push(Date.now());cd.set(m.author.id,x.filter(t=>Date.now()-t<2000))
    if(x.length>5){m.member.timeout(2*60*1000,'flood').catch(()=>{});lg('FLOOD',m.author)}
  }
})
b.on('messageCreate',async m=>{
  if(m.author.id!==C.DONO)return
  if(/^!(ativa|ativar|control)$/i.test(m.content)){
    const rows=[]
    const k=Object.entries(d.mod)
    for(let i=0;i<k.length;i+=3) rows.push(new ActionRowBuilder().addComponents(
      k.slice(i,i+3).map(([nm,st])=>ButtonBuilder.from({custom_id:'md_'+nm,label:`${st?'🟢':'🔴'} ${nm.toUpperCase()}`,style:st?3:4}))
    ))
    rows.push(new ActionRowBuilder().addComponents(
      ButtonBuilder.from({custom_id:'md_on',label:'🟢 LIGAR TUDO',style:3}),
      ButtonBuilder.from({custom_id:'md_off',label:'🔴 DESLIGAR TUDO',style:4}),
      ButtonBuilder.from({custom_id:'md_rst',label:'🔄 REINICIAR',style:1}),
      ButtonBuilder.from({custom_id:'md_up',label:'⬆️ ATUALIZAR',style:2})
    ))
    m.channel.send({
      embeds:[new EmbedBuilder().setColor('#39ff14').setAuthor({name:'ONLY CONTROL',iconURL:C.LOGO})
        .setTitle('🎛️ CENTRAL DE CONTROLE TOTAL')
        .setDescription('Ligue, desligue e gerencie todos os módulos diretamente por botões.')],
      components:rows
    })
  }
  if(/^!stats$/i.test(m.content)){
    m.channel.send({embeds:[new EmbedBuilder().setColor('#39ff14').setTitle('📊 ESTATÍSTICAS').addFields(
      {name:'👥 Membros',value:String(m.guild.memberCount),inline:true},
      {name:'📁 Canais',value:String(m.guild.channels.cache.size),inline:true},
      {name:'🎭 Cargos',value:String(m.guild.roles.cache.size),inline:true},
      {name:'📜 Ações logadas',value:String(d.logs.length),inline:true}
    )]})
  }
})
b.on('interactionCreate',i=>{
  if(!i.customId.startsWith('md_')||i.user.id!==C.DONO)return
  const k=i.customId.slice(3)
  if(k==='on') Object.keys(d.mod).forEach(x=>d.mod[x]=true)
  else if(k==='off') Object.keys(d.mod).forEach(x=>d.mod[x]=false)
  else if(d.mod[k]!==undefined) d.mod[k]=!d.mod[k]
  sv();i.deferUpdate().catch(()=>{})
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave().catch(()=>{})})
b.login(C.B.CT.t)
