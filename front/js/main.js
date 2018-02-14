let speech = require('./speech.js');
let socket = require('socket.io-client')('http://localhost:3000');

// socket.on('connect', function(){});

let inputBtn = document.getElementById('inputBtn'),
    inputEl = document.getElementById('input'),
    speakBtn = document.getElementById('speakBtn'),
    errorEl = document.getElementById('error')

ymaps.ready(() => {
    let map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 2
    });
    map.controls.add(new ymaps.control.ZoomControl());
    inputBtn.addEventListener("click", () => {
        inputCity(inputEl.value);
    });

    inputEl.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) inputCity(inputEl.value);
    });


});
speakBtn.addEventListener('click', () => speech(inputEl, errorEl));

function inputCity(inputedCityName) {
    socket.emit('send city', inputedCityName);
}