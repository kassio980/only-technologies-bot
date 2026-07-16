const { Client, GatewayIntentBits, Partials, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require('discord.js');
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
const CAT_TICKET = '1527330289716560023';
const CARGOS_SUPORTE = ['1527332940978323658','1527333815574335690','1527332253963915464','1527331859862786110','1527331648687968408'];
const TOKEN_USAR = process.env.TOKEN_TICKET || '';
let contador = 1;

const client = new Client({
  intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});

client.on('guildCreate', async g => { if(g.id !== SRV_ID) await g.leave().catch(()=>{}) });
client.on("guildMemberAdd", m => console.log(`${m.user.tag} entrou no servidor!`));
client.on("guildMemberRemove", m => console.log(`${m.user.tag} saiu do servidor!`));

client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  console.log(`${message.author.tag}: ${message.content}`);
  if(message.author.id !== DONO_ID) return;
  const cmd_exato = message.content.trim();
  const cmd = cmd_exato.toLowerCase();

  if (cmd === "!ping") return message.reply("🏓 Pong!");
  if(cmd_exato === '!TICKET') {
    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket_duvida').setLabel('❓ Duvida').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('ticket_suporte').setLabel('🛠️ Suporte').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('ticket_outro').setLabel('📩 Outro').setStyle(ButtonStyle.Secondary)
    );
    return message.channel.send({ embeds:[new EmbedBuilder().setColor('#eab308').setTitle('🎫 ABRIR ATENDIMENTO').setDescription('Escolha abaixo o tipo do seu ticket que vamos atender rapidamente.')], components:[botoes] });
  }

  if(cmd === '!hub') return message.reply({embeds:[new EmbedBuilder().setColor('#22c55e').setTitle('🤖 HUB ONLINE')]});
  if(cmd === '!veri') return message.reply({embeds:[new EmbedBuilder().setColor('#3b82f6').setTitle('🛡️ VERIFICACAO')]});
  if(cmd === '!ia') return message.reply({embeds:[new EmbedBuilder().setColor('#8b5cf6').setTitle('🧠 IA')]});
  if(cmd === '!status') return message.reply({embeds:[new EmbedBuilder().setColor('#f59e0b').setTitle('📊 SISTEMA')]});
  if(cmd === '!clonar') return message.reply({embeds:[new EmbedBuilder().setColor('#ec4899').setTitle('📂 CLONAGEM')]});
  if(cmd === '!cria') return message.reply({embeds:[new EmbedBuilder().setColor('#06b6d4').setTitle('⚙️ CRIADOR')]});
  if(cmd === '!painel') return message.reply({embeds:[new EmbedBuilder().setColor('#a855f7').setTitle('🖥️ PAINEL')]});
  if(cmd === '!adm') return message.reply({embeds:[new EmbedBuilder().setColor('#ef4444').setTitle('👑 ADMIN')]});

  if(!message.channel.name.startsWith('ticket-')) return;
  if(cmd.startsWith('!renomear ')){
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('❌ Apenas administradores!');
    const novoNome = message.content.split(' ').slice(1).join('-');
    await message.channel.setName(`ticket-${novoNome}`);
    return message.reply(`✅ Canal renomeado para: ticket-${novoNome}`);
  }
});

client.on("interactionCreate", async (inter) => {
  if(!inter.guild) return;
  if(inter.user.id !== DONO_ID) return;

  if (inter.isChatInputCommand() && inter.commandName === "ping") return inter.reply("🏓 Pong!");
  if (inter.isButton() && inter.customId === "verificar") return inter.reply({ content: "✅ Voce clicou no botao!", ephemeral: true });

  if(inter.customId.startsWith('ticket_')){
    await inter.deferReply({ephemeral:true});
    const tipo = inter.customId.split('_')[1];
    const nomeCanal = `ticket-${tipo}-${contador}`;
    contador++;

    const canal = await inter.guild.channels.create({
      name: nomeCanal, type: ChannelType.GuildText, parent: CAT_TICKET,
      permissionOverwrites: [
        { id: inter.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: inter.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory] },
        ...CARGOS_SUPORTE.map(id => ({ id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageMessages] })),
        { id: client.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageMessages] }
      ]
    });

    const mencaoCargos = CARGOS_SUPORTE.map(id => `<@&${id}>`).join(' ');
    const botoesAdmin = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('tk_finalizar').setLabel('🔒 Finalizar Ticket').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('tk_assumir').setLabel('🤝 Assumir Atendimento').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('tk_renomear').setLabel('✏️ Renomear').setStyle(ButtonStyle.Secondary)
    );
    const botoesUsuario = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('tk_notificar').setLabel('📢 Notificar Administrador').setStyle(ButtonStyle.Success) );

    await canal.send({ content: `${mencaoCargos}\nOlá ${inter.user}, seu atendimento foi aberto!`, embeds:[new EmbedBuilder().setColor('#eab308').setTitle('🎫 NOVO ATENDIMENTO ABERTO').setDescription(`Tipo: **${tipo.toUpperCase()}**\nAberto por: ${inter.user}\nID: ${inter.user.id}`)] });
    await canal.send({components:[botoesAdmin]});
    await canal.send({components:[botoesUsuario]});
    await inter.editReply({content:`✅ Seu ticket foi criado: ${canal}`});
    return;
  }

  if(inter.customId === 'tk_finalizar'){
    if(!inter.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return inter.reply({content:'❌ Apenas administradores podem fazer isso!',ephemeral:true});
    await inter.channel.setName(`fechado-${inter.channel.name.replace('ticket-','')}`);
    await inter.channel.permissionOverwrites.edit(inter.user.id, {ViewChannel:false, SendMessages:false});
    return inter.reply({content:'🔒 Ticket finalizado com sucesso!'});
  }
  if(inter.customId === 'tk_assumir'){
    if(!inter.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return inter.reply({content:'❌ Apenas administradores podem fazer isso!',ephemeral:true});
    return inter.reply({content:`🤝 ${inter.user} assumiu esse atendimento!`});
  }
  if(inter.customId === 'tk_renomear'){
    if(!inter.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return inter.reply({content:'❌ Apenas administradores podem fazer isso!',ephemeral:true});
    return inter.reply({content:'✏️ Use !renomear NOVO-NOME',ephemeral:true});
  }
  if(inter.customId === 'tk_notificar'){
    await inter.reply({content:`📢 Administradores foram avisados! Aguarde um momento. ${CARGOS_SUPORTE.map(id=>`<@&${id}>`).join(' ')}`,ephemeral:true});
  }
});

client.once("clientReady", async () => {
  console.log(`${client.user.tag} esta online!`);
  console.log('🟢 07 TICKETS | !TICKET EXCLUSIVO + SISTEMA COMPLETO');
  client.user.setActivity('ONLY · TICKETS',{type:3});
  try{
    const voce = await client.users.fetch(DONO_ID);
    await voce.send({content:`🟢 **07 TICKETS INICIADO COM SUCESSO**`});
    await voce.send({embeds:[new EmbedBuilder().setColor('#eab308').setTitle('📋 COMANDOS - TICKETS').setDescription("!TICKET - Abre o painel de atendimento\n!ping - Testa conexao\n!hub - Hub geral\n!veri - Verificacao\n!ia - Inteligencia\n!status - Ver sistema\n!clonar - Clonagem\n!cria - Criador\n!painel - Painel\n!adm - Administrador")]});
  }catch{}
});

if(!TOKEN_USAR || TOKEN_USAR.length < 20) { console.error('❌ SEM TOKEN_TICKET'); process.exit(1) }
client.login(TOKEN_USAR);
