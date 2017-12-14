const uuid = require('uuid/v4');
const dateformat = require('dateformat');

module.exports = {
    time: (date) => Math.floor(date.getTime() / 1000),
    timeNow: () => Math.floor(new Date().getTime() / 1000),
    timeToday: () => {
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime() / 1000);
    },
    getDateTime: (time) => {
        let today = new Date(time * 1000);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime() / 1000);
    },
    getHourTime: (time) => {
        let today = new Date(time * 1000);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime() / 1000);
    },
    dateNow: () => dateformat(new Date(), 'yyyy-mm-dd'),
    uuid: () => uuid().replace(/-/g, ''),
    isExists: obj => typeof obj !== 'undefined',
    isObject: obj => typeof obj === 'object',
    isNonEmptyObject: obj => typeof obj === 'object' && Object.keys(obj).length > 0,
    isNonEmptyString: str => (typeof str === 'string') && (str.length > 0),
    isNonEmptyArray: arr => Array.isArray(arr) && (arr.length > 0),
};