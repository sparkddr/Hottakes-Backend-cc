const http = require('http') ; 
const app = require('./app')

const dotenv = require("dotenv");
dotenv.config();
const MY_PORT = process.env.PORT;

app.set('port', process.env.PORT || MY_PORT)

const server = http.createServer(app);

server.listen(process.env.PORT  || MY_PORT) ;

