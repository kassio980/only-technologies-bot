const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const path = require('path');
function ld(){delete require.cache[path.join(__dirname,'_config.js')];try{return require('./_config.js')}catch{return null}}
let cfg = ld(); while(!cfg?.B) require('child_process').execSync('sleep 0.3')
const DONO_ID = process.env.DONO_ID || '1504181533353705675';
const SRV = process.env.SERVIDOR_ID || '1525498594851950692';
const TOKEN_FINAL = process.env.TOKEN_ADMIN || cfg?.B?.CL?.t || cfg?.B?.VR?.t || cfg?.B?.CB?.t || cfg?.B?.TC?.t || cfg?.B?.PN?.t || cfg?.B?.SG?.t || cfg?.B?.TK?.t || cfg?.B?.AD?.t || cfg?.B?.CT?.t || cfg?.B?.HB?.t || '';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})})
client.on('messageCreate',m=>{if(m.author.id!==DONO_ID)return})
client.on('interactionCreate',i=>{if(i.user.id!==DONO_ID)return})

client.on('clientReady',async()=>{
  console.log(`🟢 08 ADMIN | ONLINE`);
  client.user.setPresence({status:'online'});
  client.user.setActivity({name:'ONLY TECHNOLOGIES',type:ActivityType.Watching});
  try{const d=await client.users.fetch(DONO_ID);await d.send({embeds:[{color:0x22c55e,title:`🟢 08 ADMIN INICIADO`,timestamp:new Date()}]})}catch{}
})
client.on('error',e=>console.log(`🔴 08 ADMIN: ${e.message}`))
process.on('unhandledRejection',e=>console.log(`🔴 08 ADMIN: ${e.message}`))
if(!TOKEN_FINAL){console.error(`❌ FALTA VARIÁVEL: TOKEN_ADMIN`);process.exit(1)}
client.login(TOKEN_FINAL);
