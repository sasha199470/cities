const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const CitiesManager = require('./src/cities-manager.js');


const mainPage = `${__dirname}/front/index.html`;

app.get('/',  (req, res) => {
    res.sendFile(mainPage);
});

io.on('connection',  (socket) => {

    const citiesManager = new CitiesManager();
    socket.on('send city', (city) => {
        const status = citiesManager.inputCity(city);
        socket.emit('status', status);
        if (Object.is(status.code,0)) {
            const word = citiesManager.aiTurn();
            socket.emit('word', word);
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
http.listen(3000,  () => {
    console.log('listening on *:3000');
});
app.use('/static', express.static(`${__dirname}/front/js`));
app.use('/static', express.static(`${__dirname}/front/css`));