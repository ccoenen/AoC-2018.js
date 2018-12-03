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
		x2: parseInt(result[2], 10) + parseInt(result[4], 10),
		y2: parseInt(result[3], 10) + parseInt(result[5], 10),
	};
}

function fabricCounter(claims) {
	const fabric = [];
	claims.forEach((claim) => {
	});
}

function run() {
	// reading the puzzles input data to process it later
	const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-03.txt'), 'UTF-8');
	// splitting that long string into multiple array entries, converting them to numbers
	const list = puzzleInput.split('\n').map(parseLine);

	// work in progress
	console.log(list);
}

if (require.main === module) {
	run();
}

module.exports = {
	fabricCounter,
	parseLine,
	run,
};
