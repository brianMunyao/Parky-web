const { MinQueue } = require('heapify');

const ttt = [
	{
		lot_coords: '[[329, 490], [396, 402], [257, 389], [193, 466]]',
		lot_id: 42,
		lot_location_id: 12,
		lot_name: 'GM-42',
		occupied: true,
	},
	{
		lot_coords:
			'[[389, 415], [334, 490], [334, 490], [445, 492], [476, 412]]',
		lot_id: 43,
		lot_location_id: 12,
		lot_name: 'GM-43',
		occupied: false,
	},
	{
		lot_coords:
			'[[482, 422], [458, 497], [458, 497], [595, 500], [595, 500], [605, 422]]',
		lot_id: 44,
		lot_location_id: 12,
		lot_name: 'GM-44',
		occupied: true,
	},
	{
		lot_coords: '[[611, 412], [616, 497], [719, 497], [719, 410]]',
		lot_id: 45,
		lot_location_id: 12,
		lot_name: 'GM-45',
		occupied: false,
	},
	{
		lot_coords: '[[729, 422], [745, 505], [866, 513], [814, 415]]',
		lot_id: 46,
		lot_location_id: 12,
		lot_name: 'GM-46',
		occupied: false,
	},
	{
		lot_coords:
			'[[866, 495], [822, 410], [913, 402], [980, 500], [980, 500]]',
		lot_id: 47,
		lot_location_id: 12,
		lot_name: 'GM-47',
		occupied: true,
	},
	{
		lot_coords:
			'[[1005, 500], [944, 412], [944, 412], [1026, 399], [1122, 461], [1122, 461]]',
		lot_id: 48,
		lot_location_id: 12,
		lot_name: 'GM-48',
		occupied: true,
	},
	{
		lot_coords: '[[27, 665], [190, 670], [296, 536], [131, 510]]',
		lot_id: 49,
		lot_location_id: 12,
		lot_name: 'GM-49',
		occupied: true,
	},
	{
		lot_coords:
			'[[224, 668], [224, 668], [311, 523], [461, 526], [389, 691]]',
		lot_id: 50,
		lot_location_id: 12,
		lot_name: 'GM-50',
		occupied: true,
	},
	{
		lot_coords:
			'[[404, 668], [476, 500], [608, 528], [582, 673], [582, 673]]',
		lot_id: 51,
		lot_location_id: 12,
		lot_name: 'GM-51',
		occupied: false,
	},
	{
		lot_coords:
			'[[598, 662], [611, 533], [611, 533], [740, 536], [765, 668]]',
		lot_id: 52,
		lot_location_id: 12,
		lot_name: 'GM-52',
		occupied: true,
	},
	{
		lot_coords:
			'[[784, 662], [755, 546], [889, 531], [949, 665], [949, 665]]',
		lot_id: 53,
		lot_location_id: 12,
		lot_name: 'GM-53',
		occupied: true,
	},
	{
		lot_coords: '[[964, 660], [900, 541], [1036, 526], [1132, 655]]',
		lot_id: 54,
		lot_location_id: 12,
		lot_name: 'GM-54',
		occupied: true,
	},
	{
		lot_coords: '[[1153, 642], [1039, 528], [1189, 495], [1264, 585]]',
		lot_id: 55,
		lot_location_id: 12,
		lot_name: 'GM-55',
		occupied: true,
	},
];

class AppEdge {
	constructor(startNode, toNode, weight) {
		this.startNode = startNode;
		this.toNode = toNode;
		this.weight = weight;
	}

	getConnections() {
		return this.toNode;
	}

	// getDetail
}

class AppNode {
	constructor(value) {
		this.value = value;
		this.edges = [];
	}
	addEdge(edge) {
		this.edges.push(edge);
	}
	getEdges() {
		return this.edges;
	}
	getID() {
		return this.value;
	}
}

class AppGraph {
	constructor() {
		this.nodes = {};
	}

	addNode(value) {
		const node = new AppNode(value);
		this.nodes[value] = node;
		return node;
	}
	addEdge(startNode, toNode, weight = 10) {
		startNode.addEdge(new AppEdge(startNode, toNode, weight));
		toNode.addEdge(new AppEdge(toNode, startNode, weight));
	}
	getNodes() {
		return this.nodes;
	}
}

const avgPoints = (pts = []) => {
	let xSum = 0;
	let ySum = 0;

	pts.forEach((pt) => {
		xSum += pt[0];
		ySum += pt[1];
	});

	return [xSum / pts.length, ySum / pts.length];
};

const aStarSearch = (graph, start, goal) => {
	// pQueue = PriorityQueue()
	const pQueue = new MinQueue();
	const closedList = new Set();
	const route = [];

	pQueue.push(0, 10);
	pQueue.push(2, 4);

	const r = JSON.parse(ttt[0].lot_coords);
	// console.log(pQueue);
	// console.log(r[0][0]);

	// while not pQueue.empty():
	//     curr = pQueue.get()[-1]
	//     closedList.add(curr)
	//     route.append(curr)

	//     if curr == goal:
	//         clear(pQueue)
	//         break

	// 		neighbours = graph.getNodes()[curr].getEdges()
	// 		for node in neighbours:
	//         nn = node.getConnections().getId()

	//         g = cost(start, nn)
	//         h = heuristic(nn, goal)
	//         f = g+h

	//         if nn == goal:
	// 		route.append(nn)
	//             clear(pQueue)
	//             break
	//         if nn not in closedList:
	//             pQueue.put((f, nn))

	// return route
};

// function heuristic(curr, goal){

//     // to get the cost h(n) from current node to goal node
//     return getDistance(goal, curr)
// }

// function cost(start, goal){

// 	// to get the cost g(n) from start node to the current node
//     return getDistance(goal, start)
// }

const lotGraph = new AppGraph();

const space1 = lotGraph.addNode('GM1');
const space2 = lotGraph.addNode('GM2');
const space3 = lotGraph.addNode('GM3');
const space4 = lotGraph.addNode('GM4');
const space5 = lotGraph.addNode('GM5');
const space6 = lotGraph.addNode('GM6');

lotGraph.addEdge(space1, space2);
lotGraph.addEdge(space1, space3);
lotGraph.addEdge(space2, space3);
lotGraph.addEdge(space3, space4);

// aStarSearch(lotGraph, space1, space2);

console.log(
	avgPoints([
		[329, 490],
		[396, 402],
		[257, 389],
		[193, 466],
	])
);
