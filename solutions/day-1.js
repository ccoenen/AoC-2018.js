const fs = require('fs');
const path = require('path');

// reading the puzzles input data to process it later
const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-1.txt'), 'UTF-8');
// splitting that long string into multiple array entries, converting them to numbers
const transformations = puzzleInput.split('\n').map(line => parseInt(line, 10));

// ------- Part 1 ------- //
// our starting point is zero
let current = 0;

// we're going over every single item with forEach
transformations.forEach((t) => {
	// in each step we'll make sure that we have a number (parseInt does this)
	// and we'll just add it to `current`
	current += t;
});

// outputting the sum of all the numbers:
console.log('Final frequency (part 1): %d', current);


// ------- Part 2 ------- //

let i = 0;
let eternalCounter = 0;
let duplicateFound = false;
const allFrequencies = {
	0: true,
};

// this is for part 2
function checkForDuplicate(value) {
	if (duplicateFound) return;

	// let's look if we've seen this before!
	if (allFrequencies[value]) {
		console.log('First Duplicate: %d', value);
		duplicateFound = true;
	} else {
		// we'll also memorize this for later. (used in part two!)
		allFrequencies[value] = true;
	}
}

// looping over it again and again for possible duplicates in a second run
while (!duplicateFound) {
	eternalCounter += transformations[i];
	checkForDuplicate(eternalCounter);
	i = (i + 1) % transformations.length;
}
