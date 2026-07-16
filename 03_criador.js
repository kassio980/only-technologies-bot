const path=require('path');
function ld(){delete require.cache[path.join(__dirname,'_config.js')];try{return require('./_config.js')}catch(_){return null}}
let C=ld();while(!C?.B?.CB){require('child_process').execSync('sleep 0.4');C=ld()}
const {Client,GatewayIntentBits,Partials}=require('discord.js');
const DONO="1504181533353705675",SRV="1525498594851950692";
const b=new Client({intents:[Object.values(GatewayIntentBits)],partials:[Object.values(Partials)]});
b.on('guildCreate',async g=>{if(g.id!==SRV)await g.leave().catch(()=>{})});
b.on('messageCreate',async m=>{if(m.author.id!==DONO)return});
b.on('clientReady',()=>console.log('✅ CRIADOR'));
const TOKEN=C?.B?.CB?.t||C?.B?.CR?.t||'';if(!TOKEN){console.error('❌ TOKEN');process.exit(1)}
b.login(TOKEN).catch(x=>console.log(x.message));
