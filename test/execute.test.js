'use strict';

require('chai')
.use(require('chai-as-promised'))
.should();

describe('execute.js', () => {
    let execute;

    beforeEach(() => {
        execute = require('../src/execute.js');
    });

    it('exports a fn', () => {
        execute.should.be.a('function');
    });

    it('does not modify given array', () => {
        let arr = [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
        ];

        let length = arr.length;

        return execute(1, arr)
        .then(() => {
            arr.length.should.equal(length);
        });
    });

    it('resolves', () => {
        return execute(3, [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
            , () => Promise.resolve(4)
            , () => Promise.resolve(5)
        ])
        .should.eventually.eql([ 1, 2, 3, 4, 5 ]);
    });

    it('rejects', () => {
        return execute(2, [
            () => Promise.resolve(1)
            , () => Promise.resolve(2)
            , () => Promise.resolve(3)
            , () => Promise.reject('beep boop')
            , () => Promise.resolve(5)
        ])
        .should.be.rejectedWith('beep boop');
    });
});