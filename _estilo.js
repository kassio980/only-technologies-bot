const {EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle}=require('discord.js');
const COR={padrao:0x2b6cff,ok:0x22c55e,erro:0xef4444};
function ebd(t='',d=''){return new EmbedBuilder().setColor(COR.padrao).setTitle(t).setDescription(d).setFooter({text:'ONLY TECH v2.6'}).setTimestamp()}
module.exports={COR,ebd};
