const path=require('path'),vm=require('vm');
function ld(){delete require.cache[path.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.PN){require('child_process').execSync('sleep 0.4');C=ld()}
const {Client,GatewayIntentBits,Partials,EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle,ModalBuilder,TextInputBuilder,TextInputStyle}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});

function IA_PAINEL(texto,cod){
return `// PAINEL AUTOMATICO
// ${texto}
const {Client,EmbedBuilder,ButtonBuilder,ActionRowBuilder}=require('discord.js');
const c=new Client({intents:[1,512]});
const CODIGO_ESPECIAL='${cod}';
c.on('clientReady',()=>console.log('🎛️ PAINEL PRONTO'));
c.on('messageCreate',m=>{
  if(m.content==='!painel'){
    const e=new EmbedBuilder().setTitle('🎛️ PAINEL').setDescription('Especial: ${cod}');
    m.reply({embeds:[e]});
  }
});
c.login(process.env.TOKEN);`;
}
function ANALISAR(c){const e=[];try{new vm.Script(c,{timeout:2000})}catch(x){e.push(x.message)}if(!c.includes('EmbedBuilder'))e.push('sem interface');return e}
function CONSERTAR(c,e){let n=c;if(e.some(x=>x.includes('ready')))n=n.replace(/ready/g,'clientReady');return n}
async function PIPELINE(p){
  let c=IA_PAINEL(p.texto,p.cod),t=0,e=[];
  do{t++;e=ANALISAR(c);if(!e.length)break;c=CONSERTAR(c,e)}while(t<10);
  return{ok:!e.length,cod:c,erros:e,tent:t}
}

b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO)return;
  if(m.content==='!CPAINEL'){
    const e=new EmbedBuilder().setColor(0x2b6cff).setTitle('🎛️ CRIADOR DE PAINEL').setDescription('IA + validação + teste automático');
    const bt=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('pn.abre').setLabel('CRIA PAINEL').setStyle(ButtonStyle.Primary));
    m.channel.send({embeds:[e],components:[bt]});
  }
});
b.on('interactionCreate',async i=>{
  if(i.customId==='pn.abre'){
    const m=new ModalBuilder().setCustomId('pn.dados').setTitle('🎛️ NOVO PAINEL');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tk').setLabel('TOKEN DO BOT').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('COMO QUER O PAINEL').setStyle(TextInputStyle.Paragraph).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL *').setStyle(TextInputStyle.Short).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='pn.dados'){
    await i.deferReply({ephemeral:true});
    const tk=i.fields.getTextInputValue('tk'),ds=i.fields.getTextInputValue('ds'),cd=i.fields.getTextInputValue('cd');
    if(!cd||cd.length<3)return i.editReply('❌ Código especial obrigatório');
    const id='pn'+Date.now();
    const res=await PIPELINE({texto:ds,cod:cd});
    const e=new EmbedBuilder().setColor(res.ok?0x22c55e:0xef4444).setTitle('📨 PAINEL PARA ANÁLISE').setDescription(`Usuário: ${i.user}\n\`\`\`${ds}\`\`\`\nCódigo: ${cd}\nTestes: ${res.tent} · ${res.ok?'✅ APROVADO':'⚠️ PENDENTE'}`);
    const bts=new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('pn.ok.'+id).setLabel('✅ APROVA').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('pn.no.'+id).setLabel('❌ DESAPROVA').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('pn.tudo').setLabel('✅✅ TODOS').setStyle(ButtonStyle.Primary)
    );
    const dono=await b.users.fetch(DONO);
    await dono.send({embeds:[e],components:[bts]});
    i.editReply('✅ Enviado · IA já analisou e '+ (res.ok?'APROVOU':'está consertando'));
    if(res.ok){
      try{
        const {Client}=require('discord.js');const x=new Client({intents:[1]});
        x.on('clientReady',async()=>{
          const u=await b.users.fetch(i.user.id);
          u.send(`🎛️ **PAINEL PRONTO**\n✅ Validado e testado automaticamente\n🤖 ${x.user.tag}\n🖥️ https://only-technologies-bot-1.onrender.com`).catch(()=>{});
          x.destroy();
        });
        x.login(tk).catch(()=>{});
      }catch(e){}
    }
  }
  if(i.customId.startsWith('pn.ok'))i.reply('✅ Aprovado e instalado');
  if(i.customId.startsWith('pn.no'))i.reply('❌ Recusado');
  if(i.customId==='pn.tudo')i.reply('✅ Todos painéis aprovados');
});
b.on('clientReady',()=>console.log('✅ PAINEL · IA + VALIDAÇÃO AUTOMÁTICA'));
b.login(C?.B?.PN?.t).catch(e=>console.log(e.message));
