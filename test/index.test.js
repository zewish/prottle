'use strict';

require('chai')
.use(require('chai-as-promised'))
.should();

describe('index.js', () => {
    let index = require('../src/index.js');

    it('rejects with limit error', () => {
        return index()
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with limit error', () => {
        return index(0)
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with limit error', () => {
        return index('dsad')
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with array error', () => {
        return index(1, 'boo')
        .catch((err) => {
            err.message.should.equal('Array of promises required');
        });
    });

    it('resolves', () => {
        return index(1, [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
        ])
        .should.eventually.eql([ 1, 2, 3 ]);
    });
});
