const assert = require('assert');

const d3 = require('../solutions/day-03');

describe('Day 3', () => {
	describe('Part 1', () => {
		it('can parse a line of input data', () => {
			assert.deepStrictEqual({
				id: 1, x: 1, y: 3, w: 4, h: 4, x2: 5, y2: 7,
			}, d3.parseLine('#1 @ 1,3: 4x4'));
		});
	});
});
