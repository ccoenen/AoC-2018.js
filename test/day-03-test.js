const assert = require('assert');

const d3 = require('../solutions/day-03');

describe('Day 3', () => {
	describe('Part 1', () => {
		it('can parse a line of input data', () => {
			assert.deepStrictEqual(d3.parseLine('#1 @ 1,3: 4x4'), {
				id: 1, x: 1, y: 3, w: 4, h: 4, x2: 4, y2: 6,
			});
		});

		it('counts claims on a given fabric', () => {
			const claims = [{
				id: 1, x: 1, y: 1, w: 2, h: 3, x2: 3, y2: 4,
			}, {
				id: 2, x: 0, y: 2, w: 5, h: 1, x2: 4, y2: 2,
			}];
			const result = d3.fabricCounter(5, 5, claims);
			const expectation = Uint32Array.from([
				0, 0, 0, 0, 0,
				0, 1, 1, 0, 0,
				1, 2, 2, 1, 1,
				0, 1, 1, 0, 0,
				0, 0, 0, 0, 0,
			]);

			assert.deepEqual(result, expectation);
		});

		it('counts overbooked fields', () => {
			assert.equal(d3.overbookedFields(new Uint32Array([0, 0, 1, 1, 3, 4, 1, 0, 3])).length, 3);
		});
	});

	describe('Part 2', () => {
		it('finds non-conflicting claims', () => {
			const claims = [
				d3.parseLine('#1 @ 1,3: 4x4'),
				d3.parseLine('#2 @ 3,1: 4x4'),
				d3.parseLine('#3 @ 5,5: 2x2'),
			];
			const fabric = d3.fabricCounter(8, 8, claims);
			const workingClaim = d3.workingClaim(fabric, 8, claims);
			const expectation = claims[2];

			assert.deepStrictEqual(workingClaim, expectation);
		});
	});
});
