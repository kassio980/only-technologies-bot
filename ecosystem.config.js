module.exports={apps:[
{name:"01_CLONAGEM",script:"./01_clonagem.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true,exec_mode:"fork"},
{name:"02_VERIFICAÇÃO",script:"./02_verificacao.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true},
{name:"03_CRIADOR",script:"./03_criador.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true},
{name:"04_TEC",script:"./04_tec.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true},
{name:"05_PAINEL",script:"./05_painel.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true},
{name:"06_SEGURANÇA",script:"./06_seguranca.js",min_uptime:1,restart_delay:1,max_restarts:999999,autorestart:true}
]}
