const speech = require('./speech.js');
const socket = require('socket.io-client')('http://localhost:3000');

const player = [];
const computer = [];

const inputBtn = document.getElementById('inputBtn'),
    inputEl = document.getElementById('input'),
    speakBtn = document.getElementById('speakBtn'),
    lastCityEl = document.getElementById('lastCity'),
    surrenderBtn = document.getElementById('surrender'),
    listPlayerEl = document.getElementById('player'),
    listComputerEl = document.getElementById('computer'),
    errorEl = document.getElementById('error');

ymaps.ready(() => {
    let city;
    const map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 2
    });
    map.controls.add(new ymaps.control.ZoomControl());
    socket.on('status', (status) => {
        errorEl.innerHTML = "";
        switch (status.code) {
            case 0 : {
                addMarker(map, city);
                player.push(upperFirstLetter(city));
            }
                break;
            default : {
                errorEl.innerHTML = status.message;
            }
        }
    });
    socket.on('word', (word) => {
        if (word) {
            const upperFirstWord = upperFirstLetter(word);
            inputEl.value = '';
            lastCityEl.innerHTML = upperFirstWord;
            addMarker(map, upperFirstWord);
            computer.push(upperFirstWord);
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

function addMarker(map, cityName) {
    ymaps.geocode(cityName)
        .then(res => {
                try {
                    map.geoObjects.add(res.geoObjects.get(0));
                }
                catch (err) {
                    console.log('Не нашелЬ');
                }
            },
            err => console.log('Ошибка'));
}

speakBtn.addEventListener('click', () => speech(inputEl, errorEl));
surrenderBtn.addEventListener('click', () => {
    endGame();
});

function inputCity(inputedCityName) {
    socket.emit('send city', inputedCityName);
}

function upperFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function endGame() {
    inputBtn.disabled = true;
    socket.ondisconnect();
    if (player.length > computer.length) {
        computer[computer.length] = '';
    }
    let listPlayer = '<b>player</b>' + '<br>';
    let listComputer = '<b>computer</b>' + '<br>';
    for (let i = 0; i < player.length; i++) {
        listPlayer += player[i] + '<br>';
        listComputer += computer[i] + '<br>';
    }
    listPlayerEl.innerHTML = listPlayer;
    listComputerEl.innerHTML = listComputer;
}