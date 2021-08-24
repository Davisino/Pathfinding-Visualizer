import { rows } from "./app.js";
import { cols } from "./app.js";
// Handle edge case when randomTarget class is a wall;
export function randomTargets() {
    const randomStartBoxIdx = `${randomRow()}-${randomCol()}`;
    const randomTargetBoxIdx = `${randomRow()}-${randomCol()}`;

    const startIdx = document.getElementById(randomStartBoxIdx);
    const targetIdx = document.getElementById(randomTargetBoxIdx);
    
   return [randomStartBoxIdx, randomTargetBoxIdx]
}

function randomRow () {
    return Math.floor(Math.random() * rows)
}
function randomCol () {
    return Math.floor(Math.random() * cols);
}
