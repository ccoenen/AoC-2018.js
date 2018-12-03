const fs = require('fs');
const path = require('path');

function letterCounter(inputString) {
	const letters = inputString.split('');
	const counter = {};
	letters.forEach((letter) => {
		counter[letter] = counter[letter] + 1 || 1;
	});
	return counter;
}

function hasTwins(inputString) {
	return Object.values(letterCounter(inputString)).some(v => v === 2);
}

function hasTriplets(inputString) {
	return Object.values(letterCounter(inputString)).some(v => v === 3);
}

function hasSingleCharacterDifference(a, b) {
	if (a === b) return false;

	for (let i = 0; i < a.length; i++) {
		const a1 = a.slice(0, i) + a.slice(i + 1);
		const b1 = b.slice(0, i) + b.slice(i + 1);
		if (a1 === b1) {
			return a1;
		}
	}
	return false;
}

function checksum(list) {
	let twins = 0;
	let triplets = 0;
	list.forEach((item) => {
		if (hasTwins(item)) {
			twins += 1;
		}
		if (hasTriplets(item)) {
			triplets += 1;
		}
	});
	return twins * triplets;
}

function common(list) {
	list.forEach((a) => {
		list.forEach((b) => {
			const match = hasSingleCharacterDifference(a, b);
			if (match) {
				console.log('Matching Strings: %s for %s and %s', match, a, b);
			}
		});
	});
}

function run() {
	// reading the puzzles input data to process it later
	const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-02.txt'), 'UTF-8');
	// splitting that long string into multiple array entries, converting them to numbers
	const list = puzzleInput.split('\n');

	console.log('Checksum: %d', checksum(list));
	console.log('Commonalities: %s', common(list));
}

if (require.main === module) {
	run();
}

module.exports = {
	checksum,
	common,
	hasSingleCharacterDifference,
	hasTriplets,
	hasTwins,
	letterCounter,
	run,
};
