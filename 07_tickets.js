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
  intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]
});

client.on('guildCreate', async g => { if(g.id !== SRV_ID) await g.leave().catch(()=>{}) });

client.on('messageCreate', async msg => {
  if(msg.author.id !== DONO_ID) return;
  const cmd_exato = msg.content.trim();
  const cmd = cmd_exato.toLowerCase();

  if(cmd_exato === '!TICKET') {
    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('t_duvida').setLabel('Dúvida').setEmoji('❓').setStyle(1),
      new ButtonBuilder().setCustomId('t_suporte').setLabel('Suporte').setEmoji('🛠️').setStyle(3),
      new ButtonBuilder().setCustomId('t_outro').setLabel('Outro').setEmoji('📩').setStyle(2)
    );
    return msg.channel.send({embeds:[new EmbedBuilder().setColor('#eab308').setTitle('🎫 ABRIR ATENDIMENTO').setDescription('Escolha abaixo:')], components:[botoes]});
  }

  if(cmd === '!hub') return msg.reply({embeds:[new EmbedBuilder().setColor('#22c55e').setTitle('🤖 HUB ONLINE')]});
  if(cmd === '!veri') return msg.reply({embeds:[new EmbedBuilder().setColor('#3b82f6').setTitle('🛡️ VERIFICAÇÃO')]});
  if(cmd === '!ia') return msg.reply({embeds:[new EmbedBuilder().setColor('#8b5cf6').setTitle('🧠 IA')]});
  if(cmd === '!status') return msg.reply({embeds:[new EmbedBuilder().setColor('#f59e0b').setTitle('📊 SISTEMA')]});
  if(cmd === '!clonar') return msg.reply({embeds:[new EmbedBuilder().setColor('#ec4899').setTitle('📂 CLONAGEM')]});
  if(cmd === '!cria') return msg.reply({embeds:[new EmbedBuilder().setColor('#06b6d4').setTitle('⚙️ CRIADOR')]});
  if(cmd === '!painel') return msg.reply({embeds:[new EmbedBuilder().setColor('#a855f7').setTitle('🖥️ PAINEL')]});
  if(cmd === '!adm') return msg.reply({embeds:[new EmbedBuilder().setColor('#ef4444').setTitle('👑 ADMIN')]});
});

client.on('interactionCreate', inter => {
  if(!inter.customId.startsWith('t_')) return;
  inter.reply('🎫 CRIANDO SEU TICKET...',{ephemeral:true});
});

client.on('clientReady', async () => {
  console.log('🟢 07 TICKETS | !TICKET EXCLUSIVO');
  client.user.setActivity('ONLY · TICKETS',{type:3});
  try{ await (await client.users.fetch(DONO_ID)).send('🟢 TICKETS LIGADO'); }catch{}
});

if(!TOKEN_USAR || TOKEN_USAR.length < 20) { console.error('❌ SEM TOKEN_TICKET'); process.exit(1) }
client.login(TOKEN_USAR);
