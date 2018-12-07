const fs = require('fs');
const path = require('path');

/*
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.


Steps: CABDFE (by requirement, then alphabetically)
*/

const LINE_MATCHER = /^Step (\w) must be finished before step (\w) can begin.$/;

function createGraph(input) {
	const graph = {};
	input.split('\n').forEach((line) => {
		const letters = line.match(LINE_MATCHER);
		if (!letters) return;
		const requirement = letters[1];
		const next = letters[2];
		graph[requirement] = graph[requirement] || { id: requirement, next: [], requirements: [] };
		graph[next] = graph[next] || { id: next, next: [], requirements: [] };

		graph[requirement].next.push(next);
		graph[next].requirements.push(requirement);
	});

	return graph;
}

function findStart(graph) {
	return Object.values(graph).filter(node => node.requirements.length === 0);
}

function allRequirementsOnBreadcumbs(node) {
	const breadcrumbs = this;
	const result = node.requirements.every(requirement => breadcrumbs.includes(requirement));
	return result;
}

function traverse(graph, startpoints, breadcrumbs = '') {
	let updatedStartpoints = startpoints.sort((a, b) => a.id.localeCompare(b.id));
	if (startpoints.length < 1) {
		return breadcrumbs;
	}
	// go along first possible starting point
	const next = startpoints.filter(allRequirementsOnBreadcumbs, breadcrumbs).shift();
	const newStartpoints = next.next.map(id => graph[id]);
	updatedStartpoints = updatedStartpoints
		.filter(s => s !== next) // filter the current thing out - it has been done.
		.concat(newStartpoints);
	return traverse(graph, updatedStartpoints, breadcrumbs + next.id);
}

function run() {
	// reading the puzzles input data to process it later
	const puzzleInput = fs.readFileSync(path.resolve(__dirname, '../input/day-07.txt'), 'UTF-8');
	const graph = createGraph(puzzleInput);
	const solution1 = traverse(graph, findStart(graph));
	console.log('Steps to construct the thing (Part 1): %s', solution1);
	// console.log('Shortest number of units after removal of any letter (Part 2): %d', shortest);
}

if (require.main === module) {
	run();
}

module.exports = {
	allRequirementsOnBreadcumbs,
	createGraph,
	findStart,
	run,
	traverse,
};
