import { dijkstras } from "./algorithms.js";


export const shortestPathBetween = (graph, startingVertex, targetVertex) => {
	const { distances, previous, animations } = dijkstras(graph, startingVertex);
	const distance = distances[targetVertex.data];
	const path = [];

	let vertex = targetVertex;
	while (vertex) {
		path.unshift(`$${vertex.data}`);
		vertex = previous[vertex.data];
	}

	return animations.concat(path);
};

// Retrieve shortest path between vertices A and G

// setTimeout(() => {
// 	for (let i = 0; i < pathToColorDijkstras[0].length; i++) {

// 	   const stepToShortestPath = document.getElementById(pathToColorDijkstras[0][i]);
// 	   if (stepToShortestPath.className === 'start') {
// 		  continue;
// 	   } else if (stepToShortestPath.className === 'target') {
// 		  continue;
// 	   }


// 	   setTimeout(()=> {
// 		  stepToShortestPath.className = 'shortest-path';
// 	   }, i * 2)

// 	}
//  }, time)