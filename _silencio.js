const fs=require('fs'), L=__dirname+'/.logs_silencio.log'
function sil(p){try{if(p.stdout){p.stdout.resume();p.stdout.on('data',d=>fs.appendFileSync(L,String(d)))}if(p.stderr){p.stderr.resume();p.stderr.on('data',d=>fs.appendFileSync(L,String(d)))}}catch(e){}}
function SAUDE(){return{ok:true}}
module.exports={silenciar:sil,silencia:sil,SAUDE,default:sil}
