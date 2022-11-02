const http = require('http');
const app = require('./app')

const port = process.env.PORT || 7000;

const Server = http.createServer(app);

Server.listen(port);
