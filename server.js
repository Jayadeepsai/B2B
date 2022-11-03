const http = require('http');
const app = require('c:/Users/jayad/Desktop/B2B/app')

const port = process.env.PORT || 7000;

const Server = http.createServer(app);

Server.listen(port);
