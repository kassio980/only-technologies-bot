const { Client, GatewayIntentBits, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

process.env.NODE_ENV = 'production';
process.env.NODE_PATH = __dirname + "/node_modules";
require("module").Module._initPaths();

function ld(){
  delete require.cache[path.join(__dirname,'_config.js')];
  try{ return require('./_config.js') } catch{ return null }
}
let cfg = ld();
while(!cfg) { require('child_process').execSync('sleep 0.4'); cfg = ld() }

const DONO_ID = process.env.DONO_ID || '1504181533353705675';
const SRV_ID = process.env.SERVIDOR_ID || '1525498594851950692';
const TOKEN_USAR = process.env.TOKEN_TICKET || '';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('guildCreate', async g => { if(g.id !== SRV_ID) await g.leave().catch(()=>{}) });

client.on('messageCreate', async msg => {
  if(msg.author.id !== DONO_ID) return;
  const cmd_exato = msg.content.trim();
  const cmd_baixo = cmd_exato.toLowerCase();

  if(cmd_exato === '!TICKET') {
    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket_duvida').setLabel('Dúvida').setEmoji('❓').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('ticket_suporte').setLabel('Suporte').setEmoji('🛠️').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('ticket_outro').setLabel('Outro').setEmoji('📩').setStyle(ButtonStyle.Secondary)
    );
    return msg.channel.send({
      embeds:[new EmbedBuilder().setColor('#eab308').setTitle('🎫 ABRIR ATENDIMENTO').setDescription('Escolha abaixo o tipo do seu ticket que vamos atender rapidamente.')],
      components:[botoes]
    });
  }

  if(cmd_baixo === 'hub') return msg.reply({embeds:[new EmbedBuilder().setColor('#22c55e').setTitle('🤖 10 HUB IA ONLINE').setDescription('Sistema de inteligência e comando geral ativo ✅')]});
  if(cmd_baixo === 'veri' || cmd_baixo === 'verificar') return msg.reply({embeds:[new EmbedBuilder().setColor('#3b82f6').setTitle('🛡️ ONLY VERIFICAÇÃO').setDescription('Sistema de verificação carregado ✅')]});
  if(cmd_baixo === 'ia') return msg.reply({embeds:[new EmbedBuilder().setColor('#8b5cf6').setTitle('🧠 IA INTEGRADA').setDescription('Pergunte qualquer coisa que eu ajudo ✅')]});
  if(cmd_baixo === 'status' || cmd_baixo === 'statu') return msg.reply({embeds:[new EmbedBuilder().setColor('#f59e0b').setTitle('📊 STATUS GERAL').setDescription(`Sistema rodando\nHorário: ${new Date().toLocaleString('pt-BR',{timeZone:'America/Bahia'})}`)]});
  if(cmd_baixo === 'clonar') return msg.reply({embeds:[new EmbedBuilder().setColor('#ec4899').setTitle('📂 SISTEMA DE CLONAGEM').setDescription('Pronto para uso ✅')]});
  if(cmd_baixo === 'cria' || cmd_baixo === 'criador') return msg.reply({embeds:[new EmbedBuilder().setColor('#06b6d4').setTitle('⚙️ CRIADOR DE BOTS').setDescription('Ferramenta de criação ativa ✅')]});
  if(cmd_baixo === 'cpainel' || cmd_baixo === 'painel') return msg.reply({embeds:[new EmbedBuilder().setColor('#a855f7').setTitle('🖥️ PAINEL DE CONTROLE').setDescription('Interface web disponível ✅')]});
  if(cmd_baixo === 'adm' || cmd_baixo === 'admin') return msg.reply({embeds:[new EmbedBuilder().setColor('#ef4444').setTitle('👑 PAINEL ADMINISTRADOR').setDescription('Acesso exclusivo liberado ✅')]});
});

client.on('interactionCreate', async inter => {
  if(inter.user.id !== DONO_ID) return;
  if(inter.customId === 'verificar_conta') return inter.reply('✅ Verificação concluída com sucesso!',{ephemeral:true});
  if(inter.customId.startsWith('ticket_')) return inter.reply('🎫 Criando seu ticket... aguarde um instante',{ephemeral:true});
});

client.on('clientReady', async () => {
  console.log(`🟢 07 TICKETS | ONLINE · COMANDO !TICKET EXCLUSIVO`);
  client.user.setPresence({status:'online'});
  client.user.setActivity({name:'ONLY TECHNOLOGIES · TICKETS', type: ActivityType.Watching});
  try{
    const voce = await client.users.fetch(DONO_ID);
    await voce.send({embeds:[new EmbedBuilder().setColor('#eab308').setTitle(`🟢 07 TICKETS INICIADO`).setDescription('Use apenas !TICKET para chamar ✅')]});
  }catch{}
});

client.on('error', e => console.log(`🔴 07 TICKETS ERRO: ${e.message}`));
process.on('unhandledRejection', e => console.log(`🔴 07 TICKETS: ${e.message}`));

if(!TOKEN_USAR || TOKEN_USAR.length < 40) {
  console.error(`❌ ERRO: Variável TOKEN_TICKET não encontrada ou vazia`);
  process.exit(1);
}
client.login(TOKEN_USAR);
