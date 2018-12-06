const fs = require('fs');
const path = require('path');

function react(input) {
	let output = input;
	for (let i = 0; i < output.length - 1; i += 1) {
		// console.log(i, output);
		const left = output[i];
		const right = output[i + 1];
		if (left !== right && left.toLowerCase() === right.toLowerCase()) {
			output = output.slice(0, i) + output.slice(i + 2);
			if (i >= 0) i -= 2; // previous char _may_ also react. So we reverse.
			i = Math.max(-1, i); // but we never want to have less than -1 in `i`
		}
	}
	return output;
}

function remove(input, letter) {
	return input.replace(new RegExp(letter, 'ig'), '');
}

function multiRemoveReact(input) {
	let shortest = Infinity;
	for (let i = 10; i < 36; i += 1) {
		const letter = i.toString(36);
		shortest = Math.min(react(remove(input, letter)).length, shortest);
	}
	return shortest;
}

function run() {
	// reading the puzzles input data to process it later
	const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-05.txt'), 'UTF-8');
	const product = react(puzzleInput);
	const shortest = multiRemoveReact(puzzleInput);
	console.log('Number of units (Part 1): %d', product.length);
	console.log('Shortest number of units after removal of any letter (Part 2): %d', shortest);
}

if (require.main === module) {
	run();
}

module.exports = {
	multiRemoveReact,
	react,
	remove,
	run,
};
