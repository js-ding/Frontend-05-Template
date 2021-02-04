const assert = require('assert');
import { add } from '../add';

describe('add test', () => {
    it('1 + 2 should be 3', () => {
        // equal 即将被废弃
        assert.strictEqual(add(1, 2), 3);
    });

    it('-5 + 3 should be -2', () => {
        assert.strictEqual(add(-5, 3), -2);
    });
});
