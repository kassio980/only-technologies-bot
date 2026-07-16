const {Client,GatewayIntentBits,Partials}=require('discord.js')
const C=require('./_config'),CRD=require('./_card'),fs=require('fs'),cp=require('child_process')
const b=new Client({intents:Object.values(GatewayIntentBits),partials:Object.values(Partials)})
b.on('ready',()=>console.log('✅ 04 TÉCNICO'))
b.on('messageCreate',m=>{
  if(/^!(tec|tecnico)$/i.test(m.content)){
    m.channel.send(CRD('TC','tec'))
    fs.readdirSync(__dirname).filter(f=>f.endsWith('.js')&&!f.startsWith('_')&&f!=='04_tec.js').forEach(a=>{
      let c=fs.readFileSync(__dirname+'/'+a,'utf8')
      if(/setPriority/.test(c)){c=c.replace(/.*setPriority.*/g,'');fs.writeFileSync(__dirname+'/'+a,c)}
    })
    try{cp.execSync('npm i discord.js@14 axios fs-extra --silent',{stdio:'ignore'})}catch(e){}
  }
})
b.on('guildCreate',g=>{if(g.id!==C.SRV)g.leave()})
b.login(C.B.TC.t)
