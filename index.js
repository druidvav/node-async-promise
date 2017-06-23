'use strict';
let async = require('async');

class AsyncP {
    static eachSeries (list, func) {
        return new Promise((resolve, reject) => {
                async.eachSeries(list, (row, next) => {
                func(row).then(() => next(null)).catch((err) => next(err));
    }, (error) => {
            if (error) reject(error); else resolve();
        });
    });
    }
    static eachLimit (list, limit, func) {
        return new Promise((resolve, reject) => {
                async.eachLimit(list, limit, (row, next) => {
                func(row).then(() => next(null)).catch((err) => next(err));
    }, (error) => {
            if (error) reject(error); else resolve();
        });
    });
    }
    static detectSeries (list, func) {
        return new Promise((resolve, reject) => {
                async.detectSeries(list, (item, next) => {
                func(item).then((result) => next(null, result)).catch((err) => next(err));
    }, (error, result) => {
            if (error) reject(error); else resolve(result);
        });
    });
    }
    static waterfall (sequence, caller) {
        return new Promise((resolve, reject) => {
                let waterfall = [ ];
        for (let i = 0; i < sequence.length; i++) {
            waterfall.push((next) => caller(sequence[i]).then(() => next()).catch((err) => next(err)));
        }
        async.waterfall(waterfall, (err) => err ? reject(err) : resolve());
    });
    }
}

module.exports = AsyncP;