const {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js')
function B(i,l,e,s=ButtonStyle.Success){return new ButtonBuilder().setCustomId(i).setLabel(l).setEmoji(e).setStyle(s)}
function BTN(){
  return{
    embeds:[new EmbedBuilder()
      .setColor('#00ff3c')
      .setAuthor({name:'OLNY TECHNOLOGIES',iconURL:'https://i.imgur.com/9xZfKXk.png'})
      .setTitle('⚡ PAINEL PRINCIPAL · SISTEMAS 1MS')
      .setDescription('```\n╔═══════════════════════════════════════╗\n║   ESTILO FUTURISTA · VERDE NEON       ║\n║   Todos os sistemas em um só lugar    ║\n╚═══════════════════════════════════════╝\n```\nSelecione uma das funções abaixo para iniciar o atendimento automatizado.')
      .setFooter({text:'Acesso restrito · apenas servidor autorizado'})
      .setTimestamp()
    ],
    components:[
      new ActionRowBuilder().addComponents(B('bt_clonar','CLONAR AGORA','📄'),B('bt_ini','INICIAR SISTEMA','🚀')),
      new ActionRowBuilder().addComponents(B('bt_ver','VERIFICA-SE','🛡️'),B('bt_dados','VER DADOS','💾')),
      new ActionRowBuilder().addComponents(B('bt_cb','CRIA BOT','🤖'),B('bt_cmd','EXECUTAR COMANDO','⌨️')),
      new ActionRowBuilder().addComponents(B('bt_pn','CRIA PAINEL','🖥️'),B('bt_lista','LISTAR BOTS','📋')),
      new ActionRowBuilder().addComponents(B('bt_conf','CONFIGURAÇÕES','📦'),B('bt_adm','PAINEL ADMIN','⚙️',ButtonStyle.Primary)),
      new ActionRowBuilder().addComponents(B('bt_rap','CLONAGEM RÁPIDA','⚡',ButtonStyle.Primary))
    ]
  }
}
module.exports={BTN,B}
