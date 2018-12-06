const assert = require('assert');

const d2 = require('../solutions/day-02');

describe('Day 2', () => {
	describe('Part 1', () => {
		it('should count the letters', () => {
			assert.deepStrictEqual(d2.letterCounter(''), {
			});

			assert.deepStrictEqual(d2.letterCounter('abcdef'), {
				a: 1, b: 1, c: 1, d: 1, e: 1, f: 1,
			});

			assert.deepStrictEqual(d2.letterCounter('bababc'), {
				a: 2, b: 3, c: 1,
			});

			assert.deepStrictEqual(d2.letterCounter('abbcde'), {
				a: 1, b: 2, c: 1, d: 1, e: 1,
			});

			assert.deepStrictEqual(d2.letterCounter('abcccd'), {
				a: 1, b: 1, c: 3, d: 1,
			});

			assert.deepStrictEqual(d2.letterCounter('aabcdd'), {
				a: 2, b: 1, c: 1, d: 2,
			});

			assert.deepStrictEqual(d2.letterCounter('abcdee'), {
				a: 1, b: 1, c: 1, d: 1, e: 2,
			});

			assert.deepStrictEqual(d2.letterCounter('ababab'), {
				a: 3, b: 3,
			});
		});

		it('should finds twins and triplets', () => {
			assert(!d2.hasTwins('abcdef'));
			assert(d2.hasTwins('bababc'));
			assert(d2.hasTwins('abbcde'));
			assert(!d2.hasTwins('abcccd'));
			assert(d2.hasTwins('aabcdd'));
			assert(d2.hasTwins('abcdee'));
			assert(!d2.hasTwins('ababab'));

			assert(!d2.hasTriplets('abcdef'));
			assert(d2.hasTriplets('bababc'));
			assert(!d2.hasTriplets('abbcde'));
			assert(d2.hasTriplets('abcccd'));
			assert(!d2.hasTriplets('aabcdd'));
			assert(!d2.hasTriplets('abcdee'));
			assert(d2.hasTriplets('ababab'));
		});

		it('generates the checksum', () => {
			const list = [
				'abcdef',
				'bababc',
				'abbcde',
				'abcccd',
				'aabcdd',
				'abcdee',
				'ababab',
			];
			assert.equal(d2.checksum(list), 12);
		});
	});

	describe('Part 2', () => {
		it('finds the hasSingleCharacterDifference', () => {
			assert.strictEqual(d2.hasSingleCharacterDifference('fghij', 'fguij'), 'fgij');
		});

		it('same string has no Single Character Difference', () => {
			assert(!d2.hasSingleCharacterDifference('abcde', 'abcde'));
		});

		it('completely different string is no single character difference', () => {
			assert(!d2.hasSingleCharacterDifference('abcde', 'xyzab'));
		});
	});
});
