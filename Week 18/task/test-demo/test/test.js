const assert = require('assert');
const add = require('../add');

describe('add test', () => {
    it('1 + 2 should be 3', () => {
        assert.equal(add(1, 2), 3);
    });

    it('-5 + 3 should be -2', () => {
        assert.equal(add(-5, 3), -2);
    });
});
