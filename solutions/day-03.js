const fs = require('fs');
const path = require('path');

const LINE_MATCHER = /^#(\d+)\s+@\s+(\d+),(\d+):\s+(\d+)x(\d+)$/;

function parseLine(input) {
	const result = input.match(LINE_MATCHER);
	if (!result) {
		throw new Error(`invalid line: ${input}`);
	}
	return {
		id: parseInt(result[1], 10),
		x: parseInt(result[2], 10),
		y: parseInt(result[3], 10),
		w: parseInt(result[4], 10),
		h: parseInt(result[5], 10),
		// derived values, easier to work with in some cases:
		x2: parseInt(result[2], 10) + parseInt(result[4], 10) - 1,
		y2: parseInt(result[3], 10) + parseInt(result[5], 10) - 1,
	};
}

function fabricCounter(sizeX, sizeY, claims) {
	const fabric = new Uint32Array(sizeX * sizeY);

	claims.forEach((claim) => {
		if (claim.x > sizeX || claim.x2 > sizeX || claim.y > sizeY || claim.y2 > sizeY) {
			throw new Error(`claim too large for this fabric: ${claim}`);
		}

		Array.from(Array(claim.w)).forEach((unused1, dx) => {
			Array.from(Array(claim.h)).forEach((unused2, dy) => {
				const x = claim.x + dx;
				const y = claim.y + dy;
				fabric[y * sizeX + x] += 1;
			});
		});
	});

	return fabric;
}

function overbookedFields(fabric) {
	return fabric.filter(element => element > 1);
}

function run() {
	// reading the puzzles input data to process it later
	const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-03.txt'), 'UTF-8');
	// splitting that long string into multiple array entries, converting them to numbers
	const list = puzzleInput.split('\n').map(parseLine);

	const fabric = fabricCounter(1000, 1000, list);
	console.log('Number of overbooked fields (Part 1): %d', overbookedFields(fabric).length);
}

if (require.main === module) {
	run();
}

module.exports = {
	fabricCounter,
	overbookedFields,
	parseLine,
	run,
};
