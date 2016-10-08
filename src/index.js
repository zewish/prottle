'use strict';

let execute = require('./execute.js');

module.exports = (limit, promises) => {
    limit = parseInt(limit);

    if (isNaN(limit) || limit <= 0) {
        return Promise.reject(Error('Limit must be at least 1'));
    }

    if (!Array.isArray(promises)) {
        return Promise.reject(Error('Array of promises required'));
    }

    return execute(limit, promises);
};