let speech = require('./speech.js');
let socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function(){});

let inputBtn = document.getElementById('inputBtn'),
    inputEl = document.getElementById('input');

ymaps.ready(() => {
    let map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 2
    });
});
inputBtn.addEventListener('click', () => speech(inputEl));