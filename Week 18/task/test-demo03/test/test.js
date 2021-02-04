const assert = require('assert');
import { add, mul } from '../add';
// const add = require('../add').add;
// const mul = require('../add').mul;

describe('add test', () => {
    it('1 + 2 should be 3', () => {
        // equal 即将被废弃
        assert.strictEqual(add(1, 2), 3);
    });

    it('-5 + 3 should be -2', () => {
        assert.strictEqual(add(-5, 3), -2);
    });
});

describe('mul test', () => {
    it('1 * 2 should be 2', () => {
        // equal 即将被废弃
        assert.strictEqual(mul(1, 2), 2);
    });

    it('-5 * 3 should be -15', () => {
        assert.strictEqual(mul(-5, 3), -15);
    });
});
