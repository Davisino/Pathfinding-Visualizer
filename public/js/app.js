import { Graph, Vertex, Edge } from "./algorithms/dijkstras/graph.js";
import { shortestPathBetween } from "./algorithms/dijkstras/shortestPath.js";
import { randomTargets } from "./randomTarget.js";
import { restoreToDefault } from "./helperMethods/restoreToDefault.js";
// import { Queue } from './algorithms/DFS/Queue.js'
export const rows = 30;
export const cols = 75;
const velocity = 20;
// 20 -fast  80-med  150-slow
let graphVertices = [];
let tableGraph = new Graph(true, true);

// buttons
document
  .getElementById("vizualize-algorithm")
  .addEventListener("click", vizualizeAlgoSelected);
document
  .getElementById("random-target")
  .addEventListener("click", colorStartAndEnd);
document.getElementById("dijkstra-btn").addEventListener("click", function () {
  clearAlgorithmsList();
  algorithms["dijkstras"] = true;
  document.getElementById(
    "vizualize-algorithm"
  ).innerHTML = `Vizualize Dijkstras`;
});
document
  .getElementById("clear-grid")
  .addEventListener("click", restoreToDefault);
document
  .getElementById("depth-firstSearch-btn")
  .addEventListener("click", function () {
    clearAlgorithmsList();
    algorithms["dfs"] = true;
    document.getElementById("vizualize-algorithm").innerHTML = `Vizualize DFS!`;
  });
// document.getElementById('breadth-firstSearch-btn').addEventListener('click', useBreadthFirstSearch);
document
  .getElementById("breadth-firstSearch-btn")
  .addEventListener("click", function () {
    clearAlgorithmsList();
    algorithms["bfs"] = true;
    document.getElementById("vizualize-algorithm").innerHTML = `Vizualize BFS`;
  });
document.getElementById("clear-grid").addEventListener("click", clearGrid);
// start and target Inizialization:
let startAndEnd = ["13-14", "13-52"];

// Algorithms storage;
const algorithms = {
  dijkstras: false,
  bfs: false,
  dfs: false,
};
// ClearAlgorithmsList;
function clearAlgorithmsList() {
  for (let algo in algorithms) {
    algorithms[algo] = false;
  }
}
// Choose Algorithm and vizualize it handler;
function vizualizeAlgoSelected() {
  for (let algo in algorithms) {
    if (algorithms[algo] == true) {
      if (algo === "dijkstras") {
        useDijkstras();
        return;
      } else if (algo === "bfs") {
        useDijkstras();
        return;
      } else if (algo === "dfs") {
        useDepthFirstTraversal();
        return;
      }
    }
  }

  let div = document.getElementById("vizualize-algorithm");
  div.innerHTML = `Pick and Algorithm!`;
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      let color = i % 2 === 0 ? "red" : "white";
      div.style.color = color;
    }, i * 200);
  }
}

// Handle Algorithm button To click and list of algorithm appear;
document
  .getElementById("algorithm-button")
  .addEventListener("click", displayListOfAlgos);
function displayListOfAlgos() {}

export function generateGrid() {
  let table = document.getElementById("mainGrid");
  if (table.innerHTML.length > 0) table.innerHTML = "";
  tableGraph = new Graph(true, true);
  graphVertices = [];

  for (let i = 0; i < rows; i++) {
    let newRow = document.createElement("tr");
    let row = [];
    for (let td = 0; td < cols; td++) {
      let newTd = document.createElement("td");
      newTd.style.borderColor = "#73A07E";
      newTd.id = `${i}-${td}`;
      newTd.className = `unvisited`;
      //Only for the ones that are 49 (last columns)
      row.push(tableGraph.addVertex(`${newTd.id}`));

      newRow.appendChild(newTd);
    }
    graphVertices.push(row);
    table.appendChild(newRow);
  }
  colorStartAndEnd("starting");
}
document.getElementById("bod").onload = generateGrid();

function clearGrid() {
  let boxes = document.getElementsByTagName("td");
  for (let box = 0; box < boxes.length; box++) {
    boxes[box].style.backgroundColor = "white";
    boxes[box].className = "unvisited";
  }
  // ['13-14', '13-52'];
  startAndEnd = ["13-14", "13-52"];
  document.getElementById(startAndEnd[0]).style.backgroundColor =
    "rgb(17, 247, 36)";
  document.getElementById(startAndEnd[1]).style.backgroundColor =
    "rgba(226, 18, 3, 0.836)";
  document.getElementById(startAndEnd[0]).className = "start";
  document.getElementById(startAndEnd[1]).className = "target";
}

// First: Create the graph / Identify startingVertex and Ending Vertex;
// Seconrd: Call shortestPathBetween to get the array animations
// Third: dijstras should return an array of animations

// This function will handle the last right col-boxes to edge them together;
// from row 0 to end - 1 row

export function mergeVertices() {
  // merge

  // ORDER: LEFT -> UP -> DOWN -> RIGHT
  for (let rowNum = 0; rowNum < graphVertices.length; rowNum++) {
    for (let vertex = 0; vertex < graphVertices[rowNum].length; vertex++) {
      const data = graphVertices[rowNum][vertex].data;
      // If row 0
      // If first col => down & right;
      // If last col => down & left;
      // else (middle Cols) => right, left & down

      // If last row
      // If first col => right & up
      // If last col => left & up
      // else (middle cols) => right, left & up

      // middle rows
      // else => left, right, up & down;
      const lengthOfVerticesInRow = graphVertices[rowNum].length - 1;
      if (rowNum === 0) {
        const currentVertex = graphVertices[rowNum][vertex];
        const rightVertex = graphVertices[rowNum][vertex + 1];
        const downVertex = graphVertices[rowNum + 1][vertex];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        if (vertex === 0) {
          // weird here organization
          currentVertex.addEdge(rightVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
        } else {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
          currentVertex.addEdge(rightVertex, 1, currentVertex);
        }
      } else if (rowNum === graphVertices.length - 1) {
        const currentVertex = graphVertices[rowNum][vertex];
        const rightVertex = graphVertices[rowNum][vertex + 1];
        const upVertex = graphVertices[rowNum - 1][vertex];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        if (vertex === 0) {
          currentVertex.addEdge(upVertex, 1, currentVertex);
          currentVertex.addEdge(rightVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(upVertex, 1, currentVertex);
        } else {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(upVertex, 1, currentVertex);
          currentVertex.addEdge(rightVertex, 1, currentVertex);
        }
      } else {
        const currentVertex = graphVertices[rowNum][vertex];
        const upVertex = graphVertices[rowNum - 1][vertex];
        const rightVertex = graphVertices[rowNum][vertex + 1];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        const downVertex = graphVertices[rowNum + 1][vertex];
        if (vertex === 0) {
          currentVertex.addEdge(upVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
          currentVertex.addEdge(rightVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(upVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
        } else {
          currentVertex.addEdge(leftVertex, 1, currentVertex);
          currentVertex.addEdge(upVertex, 1, currentVertex);
          currentVertex.addEdge(downVertex, 1, currentVertex);
          currentVertex.addEdge(rightVertex, 1, currentVertex);
        }
      }
    }
  }
}
// Color Targets and Starting Point

function colorStartAndEnd(ifStart) {
  // Only when we render the page for the first time we should color two pointers and not uncolor any.
  if (ifStart === "starting") {
    let start = document.getElementById(startAndEnd[0]);
    let target = document.getElementById(startAndEnd[1]);
    start.className = "start";
    target.className = "target";

    return;
  }
  //   Here we should first erase any target or start, so set it to unvisited
  //   Then we need to get two new randomTargets and change their classes and
  //   set startAndEnd to those new start and target indices.
  let boxes = document.getElementsByTagName("td");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].className = "unvisited";
  }
  const getNewStartAndTarget = randomTargets();

  let start = document.getElementById(getNewStartAndTarget[0]);
  let target = document.getElementById(getNewStartAndTarget[1]);
  start.className = "start";
  target.className = "target";
  startAndEnd = [getNewStartAndTarget[0], getNewStartAndTarget[1]];
}
// Dijkstras

function useDijkstras() {
  mergeVertices();
  const pathToColorDijkstras = shortestPathBetween(
    tableGraph,
    tableGraph.getVertexByValue(startAndEnd[0]),
    tableGraph.getVertexByValue(startAndEnd[1])
  );

  //   Perhaps merge the pathToColor Disjstras to color the yellow path in time with them;
  for (let i = 0; i < pathToColorDijkstras.length; i++) {
    if (pathToColorDijkstras[i][0] != "$") {
      setTimeout(() => {
        const barToColor = document.getElementById(pathToColorDijkstras[i]);
        barToColor.className = "visited";
        barToColor.style.borderColor = "white";
      }, i * velocity);
    } else {
      const newId = pathToColorDijkstras[i].slice(1);
      const stepsToShortestPath = document.getElementById(newId);
      if (stepsToShortestPath.className === "start") {
        continue;
      } else if (stepsToShortestPath.className === "target") {
        continue;
      } else {
        setTimeout(() => {
          stepsToShortestPath.className = "shortest-path";
        }, i * velocity);
      }
    }
  }
}

// DEPTH FIRST SEARCH

let isTargetFound = false;
let tt = 1;
function depthFirstTraversal(start, visitedVertices = [start]) {
  if (start.data === startAndEnd[1]) {
    isTargetFound = true;
  }
  if (tt == 1) mergeVertices();
  tt++;
  const isTarget = document.getElementById(`${start.data}`);
  if (isTarget.className === "target") {
    isTargetFound = true;
    return;
  }

  start.edges.forEach((edge) => {
    const neighbor = edge.end;

    if (!visitedVertices.includes(neighbor) && !isTargetFound) {
      visitedVertices.push(neighbor);
      depthFirstTraversal(neighbor, visitedVertices);
    }
  });

  return visitedVertices;
}

function useDepthFirstTraversal() {
  // tt and isTargetFound must be set to 1
  // and false respectivetelly for the depth
  // first traversal function to work
  tt = 1;
  isTargetFound = false;
  // ------------------------------------------/
  let startValue = document.getElementsByClassName("start")[0].id;

  const animations = depthFirstTraversal(
    tableGraph.getVertexByValue(startValue)
  );
  const pathAnimation = getShortestPathDFS(animations);

  let time = animations.length;

  for (let i = 0; i < animations.length; i++) {
    setTimeout(() => {
      const getDataFromVertex = animations[i].data;
      let vertex = document.getElementById(`${getDataFromVertex}`);

      if (vertex.id === startAndEnd[0] || vertex.id === startAndEnd[1]) {
      } else {
        vertex.className = "visited";
        vertex.style.borderColor = "white";
      }

      time--;
      console.log(time);
      if (time === 0) {
        for (let idx = 0; idx < pathAnimation.length; idx++) {
          let index = pathAnimation[idx].slice(1);
          if (index === startAndEnd[0] || index === startAndEnd[1]) continue;
          setTimeout(() => {
            document.getElementById(`${index}`).className = "shortest-path";
          }, idx * (velocity + 20));
        }
      }
    }, i * velocity);
  }
  // const shortestPathAnimation = animations.concat(
  //   getShortestPathDFS(animations)
  // );

  // for (let idx = 0; idx < shortestPathAnimation.length; idx++) {
  //   if (
  //     shortestPathAnimation[idx].data === startAndEnd[0] ||
  //     shortestPathAnimation[idx].data === startAndEnd[1]
  //   ) {
  //     continue;
  //   }

  //   if (shortestPathAnimation[idx][0] == "$") {
  //     setTimeout(() => {
  //       let index = shortestPathAnimation[idx].slice(1);
  //       document.getElementById(`${index}`).className = "shortest-path";
  //     }, idx * velocity);
  //   } else {
  //     setTimeout(() => {
  //       const getDataFromVertex = animations[idx].data;
  //       document.getElementById(`${getDataFromVertex}`).className = "visited";
  //       document.getElementById(`${getDataFromVertex}`).style.borderColor =
  //         "white";
  //     }, idx * velocity);
  //   }
  // }
}

function getShortestPathDFS(array) {
  let animations = [];
  for (let i = 0; i < array.length; i++) {
    const val = array[i].data;
    animations.push(`$${val}`);
  }
  return animations;
}

// Breadth First Search

// const breadthFirstTraversal = (start) => {
//    const visitedVertices = [start];
//    const visitQueue = new Queue();
//    visitQueue.enqueue(start);
//    const endValue = document.getElementsByClassName('target')[0].id;

//    let isFound = false;
//    while (!visitQueue.isEmpty() && !isFound) {

//       const current = visitQueue.dequeue();

//       current.edges.forEach((edge) => {
//          const neighbor = edge.end;
//          if (neighbor.data === endValue) isFound = true;

//          if (!visitedVertices.includes(neighbor)) {
//             visitedVertices.push(neighbor);
//             visitQueue.enqueue(neighbor);

//          }
//       })

//    }
//    return visitedVertices;
// };

// function useBreadthFirstSearch() {
//    const startValue = document.getElementsByClassName('start')[0].id;
//    const startVertex = tableGraph.getVertexByValue(startValue);

//    const animations = breadthFirstTraversal(startVertex);
//    for (let idx = 0; idx < animations.length; idx++) {
//       const dataBox = animations[idx].data;
//       if (dataBox === startValue) continue;
//       setTimeout(() => {
//          document.getElementById(dataBox).className = 'visited';

//       }, idx * 10)
//    }

// }
