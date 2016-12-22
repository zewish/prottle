'use strict';

let EventEmitter = require('events');

module.exports = (limit, arr) => {
    limit = parseInt(limit);

    if (isNaN(limit) || limit <= 0) {
        return Promise.reject(Error('Limit must be at least 1'));
    }

    if (!Array.isArray(arr)) {
        return Promise.reject(Error('Array of promises required'));
    }

    let promises = [].concat(arr)
        , results = []
        , emitter = new EventEmitter();

    let run = (batch, id) => {
        Promise.all(batch.map(
            fn => Promise.resolve(fn())
        ))
        .then(res => {
            results.push.apply(results, res);
            emitter.emit(`end:${id}`);
        })
        .catch(err => {
            emitter.emit('error', err);
        });
    };

    let add = (batch, id) => {
        if (id === 0) {
            return run(batch, id);
        }

        emitter.once(`end:${id-1}`, () => run(batch, id));
    };

    let idx = -1;
    while (promises.length) {
        add(
            promises.splice(0, limit)
            , ++idx
        );
    }

    return new Promise((resolve, reject) => {
        emitter
        .once(`end:${idx}`, () => {
            resolve(results);
        })
        .once('error', err => {
            emitter.removeAllListeners();
            reject(err);
        });
    });
};