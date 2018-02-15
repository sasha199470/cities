let speech = require('./speech.js');
let socket = require('socket.io-client')('http://localhost:3000');

let player = [];
let computer = [];

let inputBtn = document.getElementById('inputBtn'),
    inputEl = document.getElementById('input'),
    speakBtn = document.getElementById('speakBtn'),
    lastCityEl = document.getElementById('lastCity'),
    surrenderBtn = document.getElementById('surrender'),
    listEl = document.getElementById('list'),
    errorEl = document.getElementById('error');

ymaps.ready(() => {
    let city;
    let map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 2
    });
    map.controls.add(new ymaps.control.ZoomControl());
    socket.on('status',(status) => {
        errorEl.innerHTML = "";
        switch (status.code) {
            case 0 :{
                addMarker(map,city);
                player.push(city);
            }
                break;
            default : {
                errorEl.innerHTML = status.message;
            }
        }
    });
    socket.on('word', (word) => {
        if (word) {
            inputEl.value = "";
            lastCityEl.innerHTML = word;
            addMarker(map,word);
            computer.push(word);
        }
        else {
            errorEl.innerHTML = 'Вы выиграли';
            endGame();
        }
    });
    inputBtn.addEventListener('click', () => {
        city = inputEl.value;
        inputCity(inputEl.value);
    });

    inputEl.addEventListener('keyup', (e) => {
        city = inputEl.value;
        if (e.keyCode === 13) inputCity(inputEl.value);
    });



});

function addMarker(map,cityName) {
    ymaps.geocode(cityName)
        .then(res => {
                try {
                    map.geoObjects.add(res.geoObjects.get(0));
                }
                catch(err) {
                    console.log('Не нашелЬ');
                }
            },
            err => console.log('Ошибка'));
}
speakBtn.addEventListener('click', () => speech(inputEl, errorEl));
surrenderBtn.addEventListener('click',()=>{
    endGame();
});

function inputCity(inputedCityName) {
    socket.emit('send city', inputedCityName);
}
function endGame() {
    inputBtn.disabled = true;
    socket.ondisconnect();
    if (player.length > computer.length) {
        computer[computer.length] = "";
    }
    let list = 'player computer <br>';
    for (let i=0;i<player.length;i++) {
        list += player[i] + " " + computer[i] + '<br>';
    }
    listEl.innerHTML = list;
}