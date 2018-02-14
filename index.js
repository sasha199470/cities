var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mainPage = `${__dirname}/front/index.html`;

app.get('/',  (req, res) => {
    res.sendFile(mainPage);
});

io.on('connection',  (socket) => {
    let i = 0;
    console.log(i++);
    socket.on('send city', (city) => {
        console.log(city);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
http.listen(3000,  () => {
    console.log('listening on *:3000');
});
app.use("/static", express.static(`${__dirname}/front/js`));
app.use("/static", express.static(`${__dirname}/front/css`))
