const fs = require('fs');
const path = require('path');

// reading the puzzles input data to process it later
const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-1.txt'), 'UTF-8');
// splitting that long string into multiple array entries, converting them to numbers
const transformations = puzzleInput.split('\n').map(line => parseInt(line, 10));

// ------- Part 1 ------- //
function finalFrequency(changes) {
	// our starting point is zero
	let current = 0;

	// we're going over every single item with forEach
	changes.forEach((t) => {
		// in each step we'll make sure that we have a number (parseInt does this)
		// and we'll just add it to `current`
		current += t;
	});

	// output the sum of all numbers
	return current;
}

// ------- Part 2 ------- //
function firstDuplicate(changes) {
	let i = 0;
	let counter = 0;
	let duplicateFound = false;
	const allFrequencies = {
		0: true,
	};

	function checkForDuplicate(value) {
		// let's look if we've seen this before!
		if (allFrequencies[value]) {
			return value;
		}

		// we'll also memorize this for later. (used in part two!)
		allFrequencies[value] = true;

		// since we haven't found anything (otherwise we wouldn't be here) we'll return false
		// meaning "we ain't found shit." https://www.youtube.com/watch?v=g3iFJpGJiug
		return false;
	}

	// looping over it again and again for possible duplicates in a second run
	while (duplicateFound === false) {
		counter += changes[i];
		duplicateFound = checkForDuplicate(counter);
		i = (i + 1) % changes.length;
	}

	return duplicateFound;
}

function run() {
	console.log('Final Frequency (part 1): %d', finalFrequency(transformations));
	console.log('First Duplicate (part 2): %d', firstDuplicate(transformations));
}

if (require.main === module) {
	run();
}
