var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mainPage = `${__dirname}/front/index.html`;

app.get('/', function(req, res){
    res.sendFile(mainPage);
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use("/static", express.static(`${__dirname}/front/js`));
