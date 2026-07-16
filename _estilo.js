const {EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js')
const CFG=require('./_config')
const ST={
  CL:{cor:CFG.CORES.CL,tit:'CLONAR AGORA',sub:'Clone servidores completo em até 60 segundos.',emoji:'📄'},
  VR:{cor:CFG.CORES.VR,tit:'VERIFICAR‑SE',sub:'Confirme sua identidade oficial Discord.',emoji:'✅'},
  CB:{cor:CFG.CORES.CB,tit:'CRIA BOT',sub:'Crie um novo bot para o seu servidor.',emoji:'🤖'},
  PN:{cor:CFG.CORES.PN,tit:'CRIAR PAINEL',sub:'Crie um painel administrativo para gerenciar seu bot.',emoji:'🖥️'},
  TC:{cor:CFG.CORES.TC,tit:'CONSERTAR TUDO',sub:'IA repara códigos, erros e dependências sozinha.',emoji:'⚙️'},
  SG:{cor:CFG.CORES.SG,tit:'SEGURANÇA ATIVA',sub:'Anti‑raid, anti‑spam, anti‑link e proteção total.',emoji:'🛡️'},
  TK:{cor:CFG.CORES.TK,tit:'TICKET',sub:'Abra um ticket para receber suporte da nossa equipe.',emoji:'🎟️'},
  AD:{cor:CFG.CORES.AD,tit:'ADMIN PANEL',sub:'Centro de administração completa do servidor.',emoji:'👑'},
  CT:{cor:CFG.CORES.CT,tit:'ONLY CONTROL',sub:'Gerencie todos os módulos por botões.',emoji:'⚡'}
}
function VISAO(chave,app){
  const s=ST[chave]
  return{
    embeds:[new EmbedBuilder()
      .setColor(s.cor)
      .setAuthor({name:`${app} · APP`,iconURL:'https://i.imgur.com/9xZfKXk.png'})
      .setThumbnail(`https://placehold.co/120x120/${s.cor.replace('#','')}/000000?text=${encodeURIComponent(s.emoji)}&font=roboto`)
      .setTitle(`${s.emoji} ${s.tit}`)
      .setDescription(s.sub)
      .setFooter({text:'ONLY TECHNOLOGIES'})
    ],
components:[new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("btn_"+chave).setLabel(`${s.emoji} ${s.tit}`).setStyle(ButtonStyle.Success))]
  }
}
function BTN(chave){
  const s=ST[chave]
  const COR={
    '#00ff3c':ButtonStyle.Success,'#00e5ff':ButtonStyle.Primary,'#009dff':ButtonStyle.Primary,
    '#ff9800':ButtonStyle.Secondary,'#ff2b2b':ButtonStyle.Danger,'#ff2bd6':ButtonStyle.Danger,
    '#7c3aed':ButtonStyle.Primary,'#ffd60a':ButtonStyle.Secondary
  }
  return new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('btn_'+chave).setLabel(`${s.emoji} ${s.tit}`).setStyle(COR[s.cor]||3))
}
function EMB(chave,app){
  const s=ST[chave]
  const COR={
    '#00ff3c':'304647','#00e5ff':'006064','#009dff':'0d47a1','#ff9800':'e65100',
    '#ff2b2b':'b71c1c','#ff2bd6':'880e4f','#7c3aed':'4527a0','#ffd60a':'ff6f00'
  }
  return{
    embeds:[new EmbedBuilder()
      .setColor(s.cor)
      .setAuthor({name:`${app} · APP`,iconURL:'https://i.imgur.com/9xZfKXk.png'})
      .setImage(`https://placehold.co/600x220/${COR[s.cor]}/ffffff?text=${encodeURIComponent(s.emoji+'  '+s.tit)}&font=roboto-bold`)
      .setTitle(`${s.emoji} ${s.tit}`)
      .setDescription(`> ${s.sub}`)
      .setFooter({text:'ONLY TECHNOLOGIES · 1MS'})
      .setTimestamp()
    ],
    components:[BTN(chave)]
  }
}
module.exports={EMB,BTN,ST}
