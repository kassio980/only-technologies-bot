const {EmbedBuilder,ActionRowBuilder,ButtonBuilder}=require('discord.js')
const C=require('./_config')
module.exports = function CARD(chave,btnId){
  const K=C.K[chave]
  return{
    embeds:[new EmbedBuilder()
      .setColor(K.c)
      .setAuthor({name:K.app,iconURL:C.LOGO})
      .setThumbnail(`https://via.placeholder.com/80/${K.c.replace('#','')}/0b1220?text=${encodeURIComponent(K.tit.split(' ')[0])}`)
      .setTitle(K.tit)
      .setDescription(K.sub)
      .setFooter({text:`ONLY TECHNOLOGIES · v${C.VER}`})
    ],
    components:[new ActionRowBuilder().addComponents(
      ButtonBuilder.from({custom_id:btnId||chave+'_x',label:K.btn,style:
        chave==='PN'?1:chave==='TK'?2:chave==='AD'?2:chave==='TC'?3:chave==='SG'?4:3
      }).setEmoji(K.btn.split(' ')[0])
    )]
  }
}
