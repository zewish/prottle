'use strict';

require('chai')
.use(require('chai-as-promised'))
.should();

describe('prottle.js', () => {
    let prottle;

    beforeEach(() => {
        prottle = require('./prottle.js');
    });

    it('exports a fn', () => {
        prottle.should.be.a('function');
    });

    it('rejects with limit error', () => {
        return prottle()
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with limit error', () => {
        return prottle(0)
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with limit error', () => {
        return prottle('dsad')
        .catch((err) => {
            err.message.should.equal('Limit must be at least 1');
        });
    });

    it('rejects with array error', () => {
        return prottle(1, 'boo')
        .catch((err) => {
            err.message.should.equal('Array of promises required');
        });
    });

    it('does not modify given array', () => {
        let arr = [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
        ];

        let length = arr.length;

        return prottle(1, arr)
        .then(() => {
            arr.length.should.equal(length);
        });
    });

    it('resolves', () => {
        return prottle(3, [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
            , () => Promise.resolve(4)
            , () => Promise.resolve(5)
        ])
        .should.eventually.eql([ 1, 2, 3, 4, 5 ]);
    });

    it('rejects', () => {
        return prottle(2, [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
            , () => Promise.reject('beep boop')
            , () => Promise.resolve(5)
        ])
        .should.be.rejectedWith('beep boop');
    });
});