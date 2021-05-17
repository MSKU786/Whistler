const http = require('http');
const port = 8000;  

const server = http.createServer();

server.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("SERVER IS UP AND RUNNIG ON PORT: ", port);
});