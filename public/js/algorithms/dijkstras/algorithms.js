import { PriorityQueue } from "./priorityQueue.js";
// This function should return an array of animations so we can color all the boxes in the table;
export const dijkstras = (graph, startingVertex) => {
	let animations = [];
	const distances = {};
	const previous = {};
	const queue = new PriorityQueue();

	queue.add({ vertex: startingVertex, priority: 0 });

	graph.vertices.forEach((vertex) => {
		distances[vertex.data] = Infinity;
		previous[vertex.data] = null;
	});

	distances[startingVertex.data] = 0;

	while (!queue.isEmpty()) {
		const { vertex } = queue.popMin();

		const box = document.getElementById(vertex.data);
		if (wasTargetPushed) {
			break;
		} 
		animations.push(...findVerticesEdges(vertex));
		vertex.edges.forEach((edge) => {
			const alternate = edge.weight + distances[vertex.data];
			const neighborValue = edge.end.data;

			if (alternate < distances[neighborValue]) {
				distances[neighborValue] = alternate;
				previous[neighborValue] = vertex;
							
		
				queue.add({ vertex: edge.end, priority: distances[neighborValue] })
			}
		})
	}
	// reset wasTargetPushed to false so it can be started again.
	wasTargetPushed = false
	return { distances, previous, animations};
};
// if (box.className === 'target')
 let wasTargetPushed = false;

function findVerticesEdges(vertex) {
	
	let VerticesToColor = [];
	// If vertex has length 4: push all edges end;
	// Else:
	// left > top  > down > right;
	// if left, top, down, right  push them in that order;
	if (vertex.edges.length && wasTargetPushed === false) {
		
		vertex.edges.map(x=> {
			const box = document.getElementById(x.end.data);
			if (box.className ===  'target') {
				wasTargetPushed = true;
			}
			if (box.className === 'unvisited') {
				VerticesToColor.push(x.end.data)	
			}
		})

	}
	return VerticesToColor;
}
