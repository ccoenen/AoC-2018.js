const assert = require('assert');

const d7 = require('../solutions/day-07');

describe('Day 7', () => {
	/*
	 -->A--->B--
	/    \      \
	C      -->D----->E
	\           /
	 ---->F-----
	*/
	const exampleGraph = {
		A: { id: 'A', next: ['B', 'D'], requirements: ['C'] },
		B: { id: 'B', next: ['E'], requirements: ['A'] },
		C: { id: 'C', next: ['A', 'F'], requirements: [] },
		D: { id: 'D', next: ['E'], requirements: ['A'] },
		E: { id: 'E', next: [], requirements: ['B', 'D', 'F'] },
		F: { id: 'F', next: ['E'], requirements: ['C'] },
	};

	describe('Part 1', () => {
		it('example conditions yield correct graph', () => {
			const exampleText = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

			const actual = d7.createGraph(exampleText);
			assert.deepStrictEqual(actual, exampleGraph);
			assert.deepStrictEqual(d7.findStart(actual), [exampleGraph.C]);
		});

		it('knows which startpoints are possible', () => {
			assert(d7.allRequirementsOnBreadcumbs.call('', exampleGraph.C));
			assert(!d7.allRequirementsOnBreadcumbs.call('xBDx', exampleGraph.E));
			assert(d7.allRequirementsOnBreadcumbs.call('xBFDx', exampleGraph.E));
		});

		it('can traverse the graph and return breadcrumbs', () => {
			assert.strictEqual(d7.traverse(exampleGraph, [exampleGraph.E], 'XBDFX'), 'XBDFXE');
			assert.strictEqual(d7.traverse(exampleGraph, [exampleGraph.C]), 'CABDFE');
		});
	});

	describe('Part 2', () => {
	});
});
