const cities = require('./data.js');
const inputStatus = require('./input-status.js');
const SortedSet = require('collections/sorted-set');
const _binarySearch = require('./utils.js');

const _mentionedCities = new WeakMap();
const _indexCities = new WeakMap();
const _lastLetter = new WeakMap();
const _isMentioned = new WeakMap();
const _addMentioned = new WeakMap();

class CitiesManager {
    constructor() {
        const mentionedCities = {};
        const indexCities = {};
        for (const key in cities) {
            mentionedCities[key] = new SortedSet();
            indexCities[key] = 0;
        }
        _mentionedCities.set(this, mentionedCities);
        _indexCities.set(this, indexCities);
        _lastLetter.set(this, null);
        const isMentioned = (cityName) => {
            return (_mentionedCities.get(this)[cityName[0]] || []).has(cityName);
        };
        const addMentioned = (cityName) => {
            const mentionedCities = _mentionedCities.get(this);
            mentionedCities[cityName[0]].push(cityName);
            _mentionedCities.set(this, mentionedCities);
        };
        _isMentioned.set(this, isMentioned);
        _addMentioned.set(this, addMentioned);
    }

    inputCity(cityName) {
        const lastLetter = _lastLetter.get(this)
        cityName = cityName.toLowerCase();
        if (!cityName) {
            return inputStatus.NONE;
        }
        if (lastLetter && !Object.is(cityName[0], lastLetter)) {
            return inputStatus.BAD_CITY;
        }
        if (_isMentioned.get(this)(cityName)) {
            return inputStatus.MENTIONED;
        }
        if (!cities[cityName[0]] || !_isExsist(cityName)) {
            return inputStatus.NO_EXIST;
        }
        _addMentioned.get(this)(cityName);
        const newLastLetter = _newLastLetter(cityName);
        _lastLetter.set(this, newLastLetter);
        return inputStatus.OK;

    }

    aiTurn() {
        let lastLetter = _lastLetter.get(this);
        const indexCities = _indexCities.get(this);
        const subList = cities[lastLetter] || [];
        let cityName = '';
        for (let i = indexCities[lastLetter]; i < subList.length; i++) {
            if (!(_isMentioned.get(this)(subList[i]))) {
                cityName = subList[i];
                _addMentioned.get(this)(cityName);
                indexCities[_lastLetter] = i + 1;
                lastLetter = _newLastLetter(cityName);
                _lastLetter.set(this, lastLetter);
                _indexCities.set(this, indexCities)
                break;
            }
        }

        return cityName;
    }
}

function _isExsist(cityName) {
    return _binarySearch(cityName, cities[cityName[0]]) !== -1 ? true : false;
}

function _newLastLetter(cityName) {
    let i = 1;
    let letter = cityName[cityName.length - i];
    while (!cities[letter] && i <= cityName.length) {
        letter = cityName[cityName.length - i];
        i++;
    }
    return letter;
}


module.exports = CitiesManager;