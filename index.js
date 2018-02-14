let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let CitiesManager = require('./src/cities-manager.js');


let mainPage = `${__dirname}/front/index.html`;

app.get('/',  (req, res) => {
    res.sendFile(mainPage);
});

io.on('connection',  (socket) => {

    let citiesManager = new CitiesManager();
    socket.on('send city', (city) => {
        let status = citiesManager.inputCity(city);
        message.wo
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
