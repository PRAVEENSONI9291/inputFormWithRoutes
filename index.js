const http = require('http');
const routes = require('./routes');
// const routes= require('./routes.mjs');


const server = http.createServer(routes);


server.listen(7500, "127.0.0.1", () => {
    console.log("listening");
})