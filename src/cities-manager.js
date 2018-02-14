let cities = require('./data.js');
let inputStatus = require('./input-status.js');
let SortedSet = require('collections/sorted-set');
let _binarySearch = require('./utils.js')

function CitiesManager() {
    this._lastLatter;
    this._mentionedCities = {};
    for (key in cities) {
        this._mentionedCities[key] = new SortedSet();
    }
    this._isMentioned = (cityName) => {
        return (this._mentionedCities[cityName[0]] || []) .has(cityName);
    }
    this._addMentioned = (cityName) => {
        this._mentionedCities[cityName[0]].push(cityName);
    }
}
CitiesManager.prototype.inputCity = function(cityName)  {
   cityName = cityName.toLowerCase();
   if (!cityName) {
       return inputStatus.NONE;
   }
    if (this._lastLetter && cityName[0] !== this.lastLetter) {
        return inputStatus.BAD_CITY;
    }
    if (this._isMentioned(cityName)) {
        return inputStatus.MENTIONED;
    }
    if (!cities[cityName[0]] || !_isExsist(cityName)) {
        return inputStatus.NO_EXIST;
    }
    this._addMentioned(cityName);
    this._lastLatter = _newLastLetter(cityName);
    return inputStatus.OK;

};
function _isExsist(cityName) {
    return _binarySearch(cityName, cities[cityName[0]]) !== -1 ? true : false;
}
function _newLastLetter(cityName) {
    let i = 1;
    let letter = cityName[cityName.length - i];
    while(!cities[letter] && i <= cityName.length) {
        letter = cityName[cityName.length - i];
        i++;
    }
    return letter;
}


module.exports = CitiesManager;