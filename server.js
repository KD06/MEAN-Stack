const http = require('http');
const app = require('./backend/app');
const port = process.env.port || 3000;

 app.set("PORT", port);
const server = http.createServer(app);

server.listen(port);