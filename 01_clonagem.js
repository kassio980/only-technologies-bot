const { Client, GatewayIntentBits, Partials, ActivityType, EmbedBuilder } = require('discord.js');
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
const TOKEN_USAR = process.env.TOKEN_CLONAGEM || '';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.on('guildCreate', async g => { if(g.id !== SRV_ID) await g.leave().catch(()=>{}) });
client.on("guildMemberAdd", m => console.log(`${m.user.tag} entrou no servidor!`));
client.on("guildMemberRemove", m => console.log(`${m.user.tag} saiu do servidor!`));

client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  console.log(`${message.author.tag}: ${message.content}`);
  if(message.author.id !== DONO_ID) return;
  const cmd = message.content.trim().toLowerCase();

  if (cmd === "!ping") return message.reply("🏓 Pong!");
  if(cmd === '!hub') return message.reply({embeds:[new EmbedBuilder().setColor('#22c55e').setTitle('🤖 10 HUB IA ONLINE').setDescription('Sistema de inteligência e comando geral ativo ✅')]});
  if(cmd === '!veri' || cmd === '!verificar') return message.reply({embeds:[new EmbedBuilder().setColor('#3b82f6').setTitle('🛡️ ONLY VERIFICAÇÃO').setDescription('Sistema de verificação carregado ✅')]});
  if(cmd === '!ia') return message.reply({embeds:[new EmbedBuilder().setColor('#8b5cf6').setTitle('🧠 IA INTEGRADA').setDescription('Pergunte qualquer coisa que eu ajudo ✅')]});
  if(cmd === '!status' || cmd === '!statu') return message.reply({embeds:[new EmbedBuilder().setColor('#f59e0b').setTitle('📊 STATUS GERAL').setDescription(`Sistema rodando\nHorário: ${new Date().toLocaleString('pt-BR',{timeZone:'America/Bahia'})}`)]});
  if(cmd === '!clonar') return message.reply({embeds:[new EmbedBuilder().setColor('#ec4899').setTitle('📂 SISTEMA DE CLONAGEM').setDescription('Pronto para uso ✅')]});
  if(cmd === '!cria' || cmd === '!criador') return message.reply({embeds:[new EmbedBuilder().setColor('#06b6d4').setTitle('⚙️ CRIADOR DE BOTS').setDescription('Ferramenta de criação ativa ✅')]});
  if(cmd === '!cpainel' || cmd === '!painel') return message.reply({embeds:[new EmbedBuilder().setColor('#a855f7').setTitle('🖥️ PAINEL DE CONTROLE').setDescription('Interface web disponível ✅')]});
  if(cmd === '!adm' || cmd === '!admin') return message.reply({embeds:[new EmbedBuilder().setColor('#ef4444').setTitle('👑 PAINEL ADMINISTRADOR').setDescription('Acesso exclusivo liberado ✅')]});
});

client.on("interactionCreate", async (interaction) => {
  if(interaction.user.id !== DONO_ID) return;
  if (interaction.isChatInputCommand() && interaction.commandName === "ping") await interaction.reply("🏓 Pong!");
  if (interaction.isButton()) {
    if (interaction.customId === "verificar") await interaction.reply({ content: "✅ Você clicou no botao!", ephemeral: true });
    if(interaction.customId === 'verificar_conta') await interaction.reply({content:'✅ Verificacao concluida com sucesso!',ephemeral:true});
  }
});

client.once("clientReady", async () => {
  console.log(`${client.user.tag} esta online!`);
  console.log(`🟢 01 CLONAGEM | ONLINE E RESPONDENDO`);
  client.user.setPresence({status:'online'});
  client.user.setActivity({name:'ONLY TECHNOLOGIES', type: ActivityType.Watching});
  try{
    const voce = await client.users.fetch(DONO_ID);
    await voce.send({content:`🟢 **01 CLONAGEM INICIADO COM SUCESSO**`});
    await voce.send({embeds:[new EmbedBuilder().setColor('#ec4899').setTitle(`📋 COMANDOS - 01 CLONAGEM`).setDescription("!clonar - Sistema de clonagem
!ping - Testa conexao
!hub - Hub geral
!veri - Verificacao
!ia - Inteligencia
!status - Ver sistema
!cria - Criador
!painel - Painel
!adm - Administrador")]});
  }catch{}
});

client.on('error', e => console.log(`🔴 01 CLONAGEM ERRO: ${e.message}`));
process.on('unhandledRejection', e => console.log(`🔴 01 CLONAGEM: ${e}`));

if(!TOKEN_USAR || TOKEN_USAR.length < 20) {
  console.error(`❌ VARIAVEL ${TOKEN_CLONAGEM} NAO ENCONTRADA OU VAZIA`);
  process.exit(1);
}
client.login(TOKEN_USAR);
