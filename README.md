[![NPM version](https://img.shields.io/npm/v/prottle.svg?style=flat-square)](https://www.npmjs.com/package/prottle)
[![Build Status](https://github.com/zewish/prottle/workflows/build/badge.svg)](https://github.com/zewish/prottle/actions?query=workflow%3Abuild)
[![Downloads](https://img.shields.io/npm/dm/prottle.svg?style=flat-square)](https://www.npmjs.com/package/prottle)

Promise.all() throttle - Prottle

- Executes promise-returning functions in batches;
- Once batch 1 is finished it's time for the next one;
- Backend - Node 4.0+ supported;
- Frontend - works with the env preset using babel. Use a Promise polyfill for IE.

Installation
------------
```bash
$ npm install prottle --save
```

Example - resolved
------------------
```js
const prottle = require('prottle');

prottle(2, [
  // batch 1
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  // batch 2
  () => Promise.resolve(3),
  () => new Promise((resolve, reject) => {
    setTimeout(() => resolve(4), 3000);
  }),
  // batch 3
  () => Promise.resolve(5),
])
  .then(res => {
    console.log(res); // [ 1, 2, 3, 4, 5 ]
  });
```

Example - rejected
------------------
```js
const prottle = require('prottle');

prottle(2, [
  () => Promise.resolve('yay'),
  () => Promise.reject('beep boop'),
  () => Promise.resolve('wow')
])
  .catch(err => {
    console.log(err); // beep boop
  });
```

Works with returned values too!
-------------------------------
```js
const prottle = require('prottle');

prottle(2, [
  () => 1,
  () => 2,
  () => 3
])
  .then(res => {
    console.log(res); // [ 1, 2, 3 ]
  });
```
