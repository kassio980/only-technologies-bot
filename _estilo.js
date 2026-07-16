const {EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle}=require('discord.js');
const CORES={verde:0x22c55e,azul:0x3b82f6,rosa:0xec4899,roxo:0x8b5cf6,laranja:0xf59e0b,vermelho:0xef4444,preto:0x0b1020};
function CARD(e,t,d,c,tx,id){
  const x=new EmbedBuilder().setColor(CORES[c]||CORES.preto).setDescription(`# ${e} ${t}\n${d}`).setFooter({text:'ONLY TECHNOLOGIES'}).setTimestamp();
  const b=new ButtonBuilder().setCustomId(id).setEmoji(e).setLabel(tx).setStyle(ButtonStyle.Primary);
  if(c==='verde')b.setStyle(ButtonStyle.Success);if(c==='vermelho')b.setStyle(ButtonStyle.Danger);if(c==='laranja')b.setStyle(ButtonStyle.Secondary);
  return{embeds:[x],components:[new ActionRowBuilder().addComponents(b)]};
}
function ebd(c,t,d){return new EmbedBuilder().setColor(CORES[c]||CORES.preto).setTitle(t).setDescription(d||'').setFooter({text:'ONLY TECHNOLOGIES'}).setTimestamp()}
module.exports={CORES,CARD,ebd};
