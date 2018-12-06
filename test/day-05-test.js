const assert = require('assert');

const d5 = require('../solutions/day-05');

describe('Day 5', () => {
	describe('Part 1', () => {
		it('satisfies the example conditions', () => {
			// In aA, a and A react, leaving nothing behind.
			assert.strictEqual(d5.react('aA'), '');

			// In abBA, bB destroys itself, leaving aA. As above, this then destroys itself,-> nothing.
			assert.strictEqual(d5.react('abBA'), '');

			// In abAB, no two adjacent units are of the same type, and so nothing happens.
			assert.strictEqual(d5.react('abAB'), 'abAB');

			// In aabAAB, even though aa and AA are of the same type, nothing happens.
			assert.strictEqual(d5.react('aabAAB'), 'aabAAB');
		});

		it('satisfies more elaborate examples', () => {
			assert.strictEqual(d5.react('dabAcCaCBAcCcaDA'), 'dabCBAcaDA');
			assert.strictEqual(d5.react('OeIiESsoMRtTjbBJYyTt'), 'MR');
		});
	});

	describe('Part 2', () => {
		it('removes a letter', () => {
			assert.strictEqual(d5.remove('abcAdaeAAaf', 'A'), 'bcdef');
		});

		it('removes and reacts to the minumum number', () => {
			assert.strictEqual(d5.multiRemoveReact('dabAcCaCBAcCcaDA'), 4);
		});
	});
});
