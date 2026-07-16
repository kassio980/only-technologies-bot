const {Client,GatewayIntentBits,Partials,EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,ModalBuilder,TextInputBuilder,TextInputStyle}=require('discord.js')
const C=require('./_config'),CRD=require('./_card'),fs=require('fs'),cp=require('child_process'),os=require('os')
const b=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers],partials:[Partials.Channel,Partials.Message]});

const DB=__dirname+'/.hub.json'
const d=fs.existsSync(DB)?JSON.parse(fs.readFileSync(DB)):{
  status:{},notifCfg:{online:true,offline:true,erros:true,atualizacoes:false},
  historico:[],comandos:C.CATS,monitorMsg:null,ultimaVerif:C.VER,ultimosErros:[]
}
function sv(){try{fs.writeFileSync(DB,JSON.stringify(d,null,2))}catch(_){}}
function ini(){Object.keys(C.B).forEach(k=>{if(!d.status[k])d.status[k]={on:false,uptime:0,ping:0,cpu:0,mem:0,ver:C.VER}});sv()}
ini()
const INICIO=Date.now()
let ultimaChecagem=0, cacheStatus={}

// ============== CORRIGIDO: CONSULTA SEM SOBRECARGA ==============
function statusBots(){
  const agora=Date.now()
  if(agora - ultimaChecagem < 6000) return cacheStatus
  ultimaChecagem=agora
  try{
    const raw=cp.execSync('pm2 jlist 2>/dev/null || echo "[]"','utf8')
    const lista=JSON.parse(raw)
    Object.keys(C.B).forEach(k=>{
      const nomeArq=k==='CL'?'01_clonagem':k==='VR'?'02_verificacao':k==='CB'?'03_criador':k==='TC'?'04_tec':k==='PN'?'05_painel':k==='SG'?'06_seguranca':k==='TK'?'07_tickets':k==='AD'?'08_admin':k==='CT'?'09_control':'10_hub'
      const a=lista.find(x=>x.pm2_env?.pm_out_log_path?.includes(nomeArq))
      d.status[k].on=!!a && a.pm2_env?.status==='online'
      d.status[k].uptime=a?Math.floor((Date.now()-(a.pm2_env?.pm_uptime||Date.now()))/1000):0
      d.status[k].mem=a?Math.round((a.monit?.memory||0)/1024/1024):0
      d.status[k].cpu=a?Number((a.monit?.cpu||0).toFixed(1)):0
      d.status[k].ping=Math.max(10,b.ws.ping)
    })
    cacheStatus={...d.status}
    return cacheStatus
  }catch(e){return cacheStatus||{}}
}
function uptimeTxt(s){
  const d=Math.floor(s/86400),h=Math.floor(s/3600)%24,m=Math.floor(s/60)%60,se=s%60
  return `${d}d ${h}h ${m}m ${se}s`
}

// ============== CORRIGIDO: NÃO TRAVA SE DM ESTIVER FECHADA ==============
async function avisaDono(tit,texto,cor='#00d4ff'){
  try{
    if(d.ultimosErros.includes(texto.slice(0,80))) return
    d.ultimosErros.push(texto.slice(0,80))
    if(d.ultimosErros.length>10)d.ultimosErros.shift()
    const u=await b.users.fetch(C.DONO,{force:false,cache:true})
    await u.send({embeds:[new EmbedBuilder().setColor(cor).setAuthor({name:'ONLY HUB · NOTIFICAÇÃO',iconURL:C.LOGO}).setTitle(tit).setDescription(texto.length>1800?texto.slice(0,1800)+'...':texto).setTimestamp()]})
  }catch(_){}
}

async function atualizaPainel(){
  statusBots(); sv()
  if(!d.monitorMsg)return
  const linhas=Object.entries(C.K).map(([k,v])=>{
    const s=d.status[k]||{on:false}
    return `${s.on?'🟢':'🔴'} **${v.app}**\n├ Uptime: ${uptimeTxt(s.uptime||0)}\n├ Ping: ${s.ping}ms · CPU: ${s.cpu||0}% · RAM: ${s.mem||0}MB`
  }).join('\n\n')
  const e=new EmbedBuilder().setColor('#00d4ff').setAuthor({name:'ONLY HUB · CENTRAL DE BOTS',iconURL:C.LOGO})
    .setTitle('🌐 STATUS EM TEMPO REAL').setDescription(linhas)
    .addFields({name:'⏱️ Uptime HUB',value:uptimeTxt(Math.floor((Date.now()-INICIO)/1000)),inline:true},{name:'📡 Ping',value:`${b.ws.ping}ms`,inline:true},{name:'🤖 Total',value:`${Object.keys(C.B).length} bots`,inline:true})
    .setFooter({text:'Atualizado a cada 12 segundos'}).setTimestamp()
  try{await d.monitorMsg.edit({embeds:[e]})}catch(_){d.monitorMsg=null;sv()}
}

function listaComandos(filtro=''){
  const txt=Object.entries(d.comandos)
    .filter(([k,v])=>!filtro||k.toLowerCase().includes(filtro.toLowerCase())||v.some(x=>x.toLowerCase().includes(filtro.toLowerCase())))
    .map(([k,v])=>`🔹 **${k}**\n${v.map(x=>`\`${x}\``).join(' · ')}`).join('\n\n')
  return txt||'⚠️ Nenhum comando encontrado.'
}

// ============== DETECÇÃO DE MUDANÇA SEM LOOP ==============
let ultimoEstadoBots={}
setInterval(()=>{
  statusBots()
  Object.keys(C.B).forEach(k=>{
    const agora=d.status[k]?.on, antes=ultimoEstadoBots[k]
    if(agora===antes)return
    ultimoEstadoBots[k]=agora
    if(agora && d.notifCfg.online)  avisaDono('🟢 BOT ONLINE',`${C.K[k].app} voltou a funcionar.`,'#39ff14')
    if(!agora&& d.notifCfg.offline) avisaDono('🔴 BOT OFFLINE',`${C.K[k].app} caiu. Reiniciando automaticamente...`,'#ff3b3b')
  })
},10000)

function IA(msg){
  const m=msg.toLowerCase()
  if(/boas[‑ ]?vindas|welcome|entrada/.test(m)) return {txt:'🎉 Mensagem pronta:',emb:new EmbedBuilder().setColor('#39ff14').setAuthor({name:'ONLY TECHNOLOGIES',iconURL:C.LOGO}).setTitle('🎉 Bem‑vindo(a)!').setDescription('Aqui você encontra os melhores sistemas de bots para Discord, com qualidade, segurança e inovação. Aproveite!').setThumbnail('{AVATAR_DO_USUARIO}').setTimestamp()}
  if(/erro|problema|falhou|n.o funciona/.test(m)) return {txt:'🔍 Soluções rápidas:',emb:new EmbedBuilder().setColor('#ffb703').setTitle('🧠 ANÁLISE DE ERRO').setDescription('1. Rode: pm2 restart SUPERVISOR\n2. Verifique se os 3 INTENTS estão LIGADOS na página do Discord Developers\n3. Atualize dependências: npm update discord.js\n4. Use !tec para reparo automático')}
  if(/embed|mensagem|an.ncio/.test(m)) return {txt:'📨 Embed gerado:',emb:new EmbedBuilder().setColor('#00d4ff').setAuthor({name:'ONLY HUB',iconURL:C.LOGO}).setTitle('📢 TÍTULO AQUI').setDescription('Escreva sua mensagem organizada aqui.\n• Ponto importante 1\n• Ponto importante 2').setFooter({text:'ONLY TECHNOLOGIES'}).setTimestamp()}
  if(/configur|setup|instalar/.test(m)) return {txt:'⚙️ Passo a passo:',emb:new EmbedBuilder().setColor('#00a6ff').setTitle('⚙️ COMO CONFIGURAR').setDescription('1. discord.com/developers → Seu App → Bot → LIGUE os 3 Privileged Gateway Intents\n2. Convide o bot com permissão de Administrador\n3. Execute o bloco de instalação no Termux')}
  return {txt:'🧠 ONLY IA',emb:new EmbedBuilder().setColor('#00d4ff').setTitle('🤖 POSSO AJUDAR COM:').setDescription('• Dúvidas sobre qualquer comando\n• Como usar cada sistema\n• Configurar bots e painéis\n• Analisar erros e soluções\n• Ideias para servidores e automações\n• Criar mensagens, embeds e textos\n• Criar e explicar códigos\n\nExemplo: !ia crie uma mensagem de boas‑vindas')}
}

b.on('ready',()=>{
  console.log('✅ 10 ONLY HUB ONLINE · v'+C.VER)
  setInterval(atualizaPainel,12000)
})
b.on('messageCreate',async m=>{
  if(!m.content||m.author.bot||m.guild?.id!==C.SRV)return
  if(m.content.startsWith('!')){d.historico.unshift({cmd:m.content,u:`${m.author.tag}`,t:Date.now()});if(d.historico.length>40)d.historico.pop();sv()}
  if(/^!hub$/i.test(m.content)){
    const cr=CRD('HB','hub_painel')
    cr.components.push(new ActionRowBuilder().addComponents(ButtonBuilder.from({custom_id:'hub_bots',label:'🌐 BOTS',style:3}),ButtonBuilder.from({custom_id:'hub_cmds',label:'📦 COMANDOS',style:1}),ButtonBuilder.from({custom_id:'hub_not',label:'🔔 NOTIFICAÇÕES',style:2}),ButtonBuilder.from({custom_id:'hub_hist',label:'📜 HISTÓRICO',style:2})))
    const env=await m.channel.send(cr).catch(()=>null)
    if(env){d.monitorMsg=env;sv()}
  }
  if(m.content.toLowerCase().startsWith('!ia')){
    const pergunta=m.content.slice(3).trim()||'ajuda'
    const res=IA(pergunta)
    m.reply({content:`> ${pergunta}\n\n**${res.txt}**`,embeds:res.emb?[res.emb]:[]}).catch(e=>m.channel.send({content:`> ${pergunta}\n\n**${res.txt}**`,embeds:res.emb?[res.emb]:[]}))
  }
  if(/^!comandos/i.test(m.content)){
    const f=m.content.split(' ').slice(1).join(' ')
    m.reply({embeds:[new EmbedBuilder().setColor('#00d4ff').setTitle('📦 COMANDOS').setDescription(listaComandos(f))]})
  }
})

b.on('interactionCreate',async i=>{
  if(i.user.id===C.DONO&&i.customId==='hub_bots') statusBots(),i.deferUpdate()
  if(i.customId==='hub_cmds') i.showModal(new ModalBuilder().setCustomId('busca_cmd').setTitle('🔎 PESQUISAR').addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q').setLabel('Palavra').setStyle(TextInputStyle.Short))))
  if(i.customId==='busca_cmd') i.reply({embeds:[new EmbedBuilder().setColor('#00d4ff').setDescription(listaComandos(i.fields.getTextInputValue('q')))],ephemeral:true})
  if(i.customId==='hub_not'){
    const bts=new ActionRowBuilder().addComponents(...Object.entries(d.notifCfg).map(([k,v])=>ButtonBuilder.from({custom_id:'nt_'+k,label:`${v?'🟢':'🔴'} ${k.toUpperCase()}`,style:v?3:4})))
    i.update({embeds:[new EmbedBuilder().setColor('#00d4ff').setTitle('🔔 CONFIGURAÇÃO')],components:[bts]})
  }
  if(i.customId.startsWith('nt_')){const k=i.customId.slice(3);d.notifCfg[k]=!d.notifCfg[k];sv();i.deferUpdate()}
  if(i.customId==='hub_hist'){const h=d.historico.slice(0,12).map(x=>`<t:${Math.floor(x.t/1000)}:R> · \`${x.cmd}\` · ${x.u}`).join('\n')||'Vazio';i.update({embeds:[new EmbedBuilder().setColor('#00d4ff').setTitle('📜 HISTÓRICO').setDescription(h)]})}
})

process.on('uncaughtException',(erro)=>{
  console.error('ERRO:',erro.message)
  if(d.notifCfg.erros) avisaDono('⚠️ ERRO DETECTADO',erro.message.slice(0,100),'#ff9500')
})
process.on('unhandledRejection',(erro)=>{
  console.error('REJEIÇÃO:',erro?.message||erro)
})

b.login(C.B.HB.t)
