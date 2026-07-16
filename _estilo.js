const {EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle}=require('discord.js');
const CORES={verde:0x22c55e,azul:0x3b82f6,rosa:0xec4899,roxo:0x8b5cf6,laranja:0xf59e0b,vermelho:0xef4444,preto:0x0b1020};
function CARD(emoji,titulo,desc,cor,textoBotao,idBotao){
  const e=new EmbedBuilder().setColor(CORES[cor]||CORES.preto).setAuthor({name:titulo,iconURL:`https://cdn.discordapp.com/emojis/${emoji}`||null})
  .setDescription(`# ${emoji} ${titulo}\n${desc}`).setFooter({text:'ONLY TECHNOLOGIES'}).setTimestamp();
  const b=new ButtonBuilder().setCustomId(idBotao).setEmoji(emoji).setLabel(textoBotao).setStyle(ButtonStyle.Primary);
  if(cor==='verde')b.setStyle(ButtonStyle.Success);
  if(cor==='vermelho')b.setStyle(ButtonStyle.Danger);
  if(cor==='laranja')b.setStyle(ButtonStyle.Secondary);
  return {embeds:[e],components:[new ActionRowBuilder().addComponents(b)]};
}
function ebd(c,t,d){return new EmbedBuilder().setColor(CORES[c]||CORES.preto).setTitle(t).setDescription(d||'').setFooter({text:'ONLY TECHNOLOGIES'}).setTimestamp()}
module.exports={CORES,CARD,ebd};
