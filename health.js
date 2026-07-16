// 🩺 Health Check — Render não dorme se receber ping a cada 10min
const http = require('http');
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify({
    status: "ONLINE",
    sistema: "ONLY TECHNOLOGIES v2.1.0",
    uptime: process.uptime()|0,
    bots: 10,
    hora: new Date().toLocaleString('pt-BR')
  }));
}).listen(PORT, () => console.log(`🩺 Health rodando na porta ${PORT}`));
